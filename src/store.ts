import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "@/reducers";
import rootSaga from "@/sagas";

const sagaMiddleware = createSagaMiddleware();
const rootStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default rootStore;
const rootState = rootStore.getState();
export type RootState = typeof rootState;
