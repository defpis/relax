import * as PIXI from 'pixi.js';
import { fromEvent, Observable, Subscription, merge } from 'rxjs';
import { switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { BaseProps, FillProps, SelectedProps } from './models/selectedProps';
import { store } from './store';

export enum CapabilityType {
  Base = 'base',
  Fill = 'fill',
}

interface Dict {
  [key: string]: any;
}

export abstract class Capability<T extends PIXI.DisplayObject, U extends Dict = Dict> {
  displayObject: DisplayObject<T>;

  constructor(displayObject: DisplayObject<T>) {
    this.displayObject = displayObject;
  }

  update(partialProps: Partial<U> = {}): void {
    this.props = { ...this.props, ...partialProps };
  }

  abstract props: U;
  abstract draw(): void;
}

export class BaseCapability<T extends PIXI.DisplayObject> extends Capability<T, BaseProps> {
  props: BaseProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    angle: 0,
  };

  constructor(displayObject: DisplayObject<T>, partialProps?: Partial<BaseProps>) {
    super(displayObject);
    this.update(partialProps);
  }

  draw(): void {
    const { displayObject, props } = this;
    const { pixiObject } = displayObject;
    const { x, y, angle } = props;
    pixiObject.position.set(x, y);
    pixiObject.angle = angle;
  }
}

export class FillCapability<T extends PIXI.Graphics> extends Capability<T, FillProps> {
  props: FillProps = {
    color: 0x000000,
  };

  constructor(displayObject: DisplayObject<T>, partialProps?: Partial<FillProps>) {
    super(displayObject);
    this.update(partialProps);
  }

  draw(): void {
    const { displayObject, props } = this;
    const { pixiObject } = displayObject;
    const { color } = props;
    const baseProps = displayObject.capabilities.get(CapabilityType.Base)?.props;
    if (baseProps) {
      const { width, height } = baseProps;
      pixiObject.beginFill(color);
      pixiObject.drawRect(0, 0, width, height);
      pixiObject.endFill();
    }
  }
}

export abstract class DisplayObject<T extends PIXI.DisplayObject = PIXI.DisplayObject> {
  pixiObject: T;
  mousedown$: Observable<PIXI.InteractionEvent>;
  mousemove$: Observable<PIXI.InteractionEvent>;
  mouseup$: Observable<PIXI.InteractionEvent>;
  mouseupoutside$: Observable<PIXI.InteractionEvent>;
  dragSub: Subscription | null = null;

  constructor(pixiObject: T) {
    this.pixiObject = pixiObject;
    this.pixiObject.interactive = true;
    this.mousedown$ = fromEvent(this.pixiObject, 'mousedown');
    this.mousemove$ = fromEvent(this.pixiObject, 'mousemove');
    this.mouseup$ = fromEvent(this.pixiObject, 'mouseup');
    this.mouseupoutside$ = fromEvent(this.pixiObject, 'mouseupoutside');
    this.applyDraggable();
  }

  appendTo(container: PIXI.Container): void {
    container.addChild(this.pixiObject);
    this.draw();
  }

  applyDraggable(): void {
    const { dispatch } = store;
    const { mousedown$, mousemove$, mouseup$, mouseupoutside$ } = this;
    let offset = { x: 0, y: 0 };
    this.dragSub = mousedown$
      .pipe(
        switchMap(({ data: { global } }) => {
          dispatch.selectedList.AsyncSetSelectAndUpdateProps([this]);
          offset = {
            x: global.x - this.pixiObject.position.x,
            y: global.y - this.pixiObject.position.y,
          };
          return mousemove$.pipe(takeUntil(merge(mouseup$, mouseupoutside$)));
        }),
        throttleTime(20),
      )
      .subscribe(({ data: { global } }) => {
        dispatch.selectedProps.updateBaseProps({
          x: global.x - offset.x,
          y: global.y - offset.y,
        });
      });
  }

  cancelDraggable(): void {
    if (this.dragSub) {
      this.dragSub.unsubscribe();
      this.dragSub = null;
    }
  }

  draw(selectedProps?: SelectedProps): void {
    this.clear();
    for (const [type, cap] of this.capabilities.entries()) {
      if (selectedProps) {
        cap.update(selectedProps[type]);
      }
      cap.draw();
    }
  }

  abstract capabilities: Map<CapabilityType, Capability<T>>;
  abstract clear(): void;
}

type NestPartial<T> = {
  [P in keyof T]?: NestPartial<T[P]>;
};

export class Rect extends DisplayObject<PIXI.Graphics> {
  capabilities = new Map<CapabilityType, Capability<PIXI.Graphics>>();

  constructor(pixiObject: PIXI.Graphics, partialProps: NestPartial<SelectedProps>) {
    super(pixiObject);

    this.capabilities.set(
      CapabilityType.Base,
      new BaseCapability<PIXI.Graphics>(this, partialProps[CapabilityType.Base]),
    );
    this.capabilities.set(
      CapabilityType.Fill,
      new FillCapability<PIXI.Graphics>(this, partialProps[CapabilityType.Fill]),
    );
  }

  clear(): void {
    this.pixiObject.clear();
  }
}
