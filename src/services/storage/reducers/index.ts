import { combineReducers } from "redux";

import postsReducer from "./posts";

const rootReducer = combineReducers({
  posts: postsReducer,
  // Add other slices of state as needed
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
