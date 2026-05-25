import PostList from "@components/PostList";
import { usePosts } from "@storage/hooks/usePosts"; // Adjust the import path based on your project structure
import { globalStyles } from "@utils/styles";
import React, { useEffect } from "react";
import { View, Text } from "react-native";

const BookmarksPage: React.FC = () => {
  const { posts, loading, error } = usePosts();
  console.log(posts);
  useEffect(() => {
    // Do something with posts, loading, error
  }, [posts, loading, error]);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.screenTitle}>Bookmarks</Text>
      <Text style={globalStyles.sectionSubtitle}>
        Saved articles will appear here. Showing Wikipedia articles for now.
      </Text>
      <PostList
        posts={posts.slice(0, 5)}
        loading={loading}
        error={error}
        onRefresh={() => void 0}
        emptyMessage="No bookmarked articles yet."
      />
    </View>
  );
};

export default BookmarksPage;
