import { isFunction } from 'lodash';

enum StateType {
  idle = 'idle',
  hover = 'hover',
  select = 'select',
  move = 'move',
}

let idleState: State;

abstract class State {
  onState: boolean = false;
  tasks: Function[];
  clearTasks: Function[] = [];

  constructor(tasks: Function[] = []) {
    this.tasks = tasks;
  }

  next(nextState: State): State {
    if (!this.nextStateTypes.includes(nextState.stateType)) {
      console.error(`Can't change state from "${this.stateType}" to "${nextState.stateType}"!`);
      return this;
    }

    this.disable(nextState);
    nextState.enable(this);

    return nextState;
  }

  enable(prevState?: State) {
    if (prevState) {
      this.clearTasks = this.tasks
        .map((task) => task(this, prevState))
        .filter((result) => isFunction(result)) as Function[];
    }
    this.onEnable();
    this.onState = true;
  }

  disable(nextState?: State) {
    if (nextState) {
      this.clearTasks.forEach((task) => task(nextState, this));
      this.clearTasks = [];
    }
    this.onDisable();
    this.onState = false;
  }

  abstract nextStateTypes: StateType[];
  abstract stateType: StateType;
  protected abstract onEnable(): void;
  protected abstract onDisable(): void;
}

class IdleState extends State {
  stateType = StateType.idle;
  nextStateTypes = [StateType.hover, StateType.select, StateType.move];
  onEnable() {
    console.log('enable idle');
  }
  onDisable() {
    console.log('disable idle');
  }
}

class HoverState extends State {
  stateType = StateType.hover;
  nextStateTypes = [StateType.select];
  onEnable() {
    console.log('enable hover');
  }
  onDisable() {
    console.log('disable hover');
  }
}

class SelectState extends State {
  stateType = StateType.select;
  nextStateTypes = [StateType.move];
  onEnable() {
    console.log('enable select');
  }
  onDisable() {
    console.log('disable select');
  }
}

class MoveState extends State {
  stateType = StateType.move;
  nextStateTypes = [StateType.hover];
  onEnable() {
    console.log('enable move');
  }
  onDisable() {
    console.log('disable move');
  }
}

const stateChangeLog = (nextState: State, prevState: State) => {
  console.log(`${prevState.stateType} ==> ${nextState.stateType}`);
};

// eslint-disable-next-line prefer-const
idleState = new IdleState([stateChangeLog]);
const hoverState = new HoverState([stateChangeLog]);
const selectState = new SelectState([stateChangeLog]);
const moveState = new MoveState([stateChangeLog]);

export class StateMachine {
  currentState: State = idleState;
  stateMap: Map<StateType, State> = new Map();

  constructor(AllStates: State[]) {
    this.currentState.enable();
    AllStates.forEach((state) => {
      this.stateMap.set(state.stateType, state);
    });
  }

  next(nextStateType: StateType): State {
    const nextState = this.stateMap.get(nextStateType);
    if (nextState) {
      const prevState = this.currentState;
      try {
        this.currentState = this.currentState.next(nextState);
      } catch (error) {
        if (nextState.onState) {
          nextState.disable();
        }
        if (!prevState.onState) {
          prevState.enable();
        }
        this.currentState = prevState;
        throw error;
      }
    } else {
      console.error(`Can't find state "${nextStateType}" in all states ${JSON.stringify([...this.stateMap.keys()])}`);
    }
    return this.currentState;
  }
}

const stateMachine = new StateMachine([idleState, hoverState, selectState, moveState]);
stateMachine.next(StateType.hover);
stateMachine.next(StateType.select);
stateMachine.next(StateType.move);
