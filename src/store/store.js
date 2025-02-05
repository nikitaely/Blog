import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./authReducer";
import {thunk} from "redux-thunk";
import { saveToLocalStorage, loadFromLocalStorage } from "./middleware";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
