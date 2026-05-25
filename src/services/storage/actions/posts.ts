import * as api from "@api/wordpressApi";
import { PostType } from "@storage/reducers/types";
import {
  WIKIPEDIA_PLACEHOLDER_IMAGE,
  WIKIPEDIA_SEARCH_TERM,
} from "@utils/constants";

import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
} from "./actionTypes";

// Action creators
interface FetchPostsRequestAction {
  type: typeof FETCH_POSTS_REQUEST;
}

interface FetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: PostType[];
}

interface FetchPostsFailureAction {
  type: typeof FETCH_POSTS_FAILURE;
  payload: string;
}

export type PostsActionTypes =
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction;

interface WikipediaPage {
  pageid: number;
  title: string;
  extract?: string;
  thumbnail?: {
    source: string;
  };
}

interface WikipediaSearchResponse {
  query?: {
    pages?: Record<string, WikipediaPage>;
  };
}

const toPost = (page: WikipediaPage): PostType => ({
  id: page.pageid,
  title: {
    rendered: page.title,
  },
  excerpt: {
    rendered: page.extract || "Open this article on Wikipedia to learn more.",
  },
  jetpack_featured_media_url:
    page.thumbnail?.source || WIKIPEDIA_PLACEHOLDER_IMAGE,
});

// Async action creator
export const fetchPosts =
  () => async (dispatch: (action: PostsActionTypes) => void) => {
    dispatch({ type: FETCH_POSTS_REQUEST });

    try {
      const response = await api.get<WikipediaSearchResponse>(
        `?action=query&format=json&origin=*&generator=search&gsrsearch=${encodeURIComponent(
          WIKIPEDIA_SEARCH_TERM,
        )}&gsrlimit=20&prop=extracts|pageimages&exintro=true&explaintext=true&pithumbsize=800`,
      );
      const posts = Object.values(response.query?.pages || {}).map(toPost);
      dispatch({ type: FETCH_POSTS_SUCCESS, payload: posts });
    } catch (error: any) {
      dispatch({ type: FETCH_POSTS_FAILURE, payload: error.message });
    }
  };
