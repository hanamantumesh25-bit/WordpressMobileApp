import rootReducer, { RootState } from "@storage/reducers";
import { createStore, applyMiddleware } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";

// Define the dispatch type
export type AppDispatch = ThunkDispatch<RootState, void, any>;

const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStore = typeof store;

export default store;
