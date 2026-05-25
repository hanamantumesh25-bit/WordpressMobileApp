import PostList from "@components/PostList";
import { usePosts } from "@storage/hooks/usePosts"; // Adjust the import path based on your project structure
import { globalStyles } from "@utils/styles";
import React, { useEffect } from "react";
import { View, Text } from "react-native";

const CategoriesPage: React.FC = () => {
  const { posts, loading, error } = usePosts();
  console.log(posts);
  useEffect(() => {
    // Do something with posts, loading, error
  }, [posts, loading, error]);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.screenTitle}>Categories</Text>
      <View style={globalStyles.categoryBar}>
        <Text style={globalStyles.categoryChip}>Technology</Text>
        <Text style={globalStyles.categoryChip}>Science</Text>
        <Text style={globalStyles.categoryChip}>History</Text>
      </View>
      <PostList
        posts={posts}
        loading={loading}
        error={error}
        onRefresh={() => void 0}
        emptyMessage="No category articles found."
      />
    </View>
  );
};

export default CategoriesPage;
