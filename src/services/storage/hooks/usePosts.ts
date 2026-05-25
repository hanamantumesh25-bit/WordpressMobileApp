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

const fallbackPosts: PostType[] = [
  {
    id: 1,
    title: { rendered: "Technology" },
    excerpt: {
      rendered:
        "Technology is the application of conceptual knowledge to achieve practical goals, especially in a reproducible way.",
    },
    jetpack_featured_media_url: WIKIPEDIA_PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    title: { rendered: "Information technology" },
    excerpt: {
      rendered:
        "Information technology is a set of related fields that include computer systems, software, programming languages, data, and information processing.",
    },
    jetpack_featured_media_url: WIKIPEDIA_PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    title: { rendered: "Artificial intelligence" },
    excerpt: {
      rendered:
        "Artificial intelligence is intelligence exhibited by machines, particularly computer systems.",
    },
    jetpack_featured_media_url: WIKIPEDIA_PLACEHOLDER_IMAGE,
  },
  {
    id: 4,
    title: { rendered: "Computer science" },
    excerpt: {
      rendered:
        "Computer science is the study of computation, information, and automation.",
    },
    jetpack_featured_media_url: WIKIPEDIA_PLACEHOLDER_IMAGE,
  },
];

// Custom hook for managing posts state and actions
export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<WikipediaSearchResponse>("", {
        params: {
          action: "query",
          format: "json",
          origin: "*",
          generator: "search",
          gsrsearch: WIKIPEDIA_SEARCH_TERM,
          gsrlimit: 20,
          prop: "extracts|pageimages",
          exintro: true,
          explaintext: true,
          pithumbsize: 800,
        },
      });
      const wikipediaPosts = Object.values(response.query?.pages || {}).map(
        toPost,
      );
      setPosts(wikipediaPosts.length > 0 ? wikipediaPosts : fallbackPosts);
    } catch (fetchError: any) {
      setPosts(fallbackPosts);
      setError(null);
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
