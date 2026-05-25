import * as api from "@api/wordpressApi";
import { PostType } from "@storage/reducers/types";
import {
  WIKIPEDIA_PLACEHOLDER_IMAGE,
  WIKIPEDIA_SEARCH_TERM,
} from "@utils/constants";
import { useCallback, useEffect, useState } from "react";

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

// Custom hook for managing posts state and actions
export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<WikipediaSearchResponse>(
        `?action=query&format=json&origin=*&generator=search&gsrsearch=${encodeURIComponent(
          WIKIPEDIA_SEARCH_TERM,
        )}&gsrlimit=20&prop=extracts|pageimages&exintro=true&explaintext=true&pithumbsize=800`,
      );
      setPosts(Object.values(response.query?.pages || {}).map(toPost));
    } catch (fetchError: any) {
      setError(fetchError.message || "Unable to load Wikipedia articles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchPosts();
  }, [refetchPosts]);

  // Return relevant data and actions
  return {
    posts,
    loading,
    error,
    refetchPosts,
  };
};
