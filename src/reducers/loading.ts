import { START_LOADING, STOP_LOADING } from "@/actions";

export default function (state = false, action: any) {
  switch (action.type) {
    case START_LOADING: {
      return true;
    }
    case STOP_LOADING: {
      return false;
    }
    default: {
      return state;
    }
  }
}
