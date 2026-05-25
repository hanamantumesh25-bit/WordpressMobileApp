import { combineReducers } from "redux";

import postsReducer from "./posts";
import { PostsState } from "./types";

// Define the type for the combined state
export interface RootState {
  posts: PostsState;
  // Add other slices of state as needed
}

const rootReducer = combineReducers({
  posts: postsReducer,
  // Add other slices of state as needed
});

export default rootReducer;
