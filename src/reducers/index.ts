import { combineReducers } from "redux";
import todo from "./todo";
import loading from "./loading";

export default combineReducers({ todo, loading });
