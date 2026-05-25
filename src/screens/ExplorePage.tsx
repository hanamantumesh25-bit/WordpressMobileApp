import ImageCarousel from "@components/ImageCarousel";
import PostList from "@components/PostList";
import { usePosts } from "@storage/hooks/usePosts"; // Adjust the import path based on your project structure
import { imageCarouselStyle, globalStyles } from "@utils/styles";
import React, { useEffect } from "react";
import { View, Text } from "react-native";

const ExplorePage: React.FC = () => {
  const { posts, loading, error, refetchPosts } = usePosts();
  console.log(posts);
  useEffect(() => {
    // Do something with posts, loading, error
  }, [posts, loading, error]);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.screenTitle}>Explore</Text>
      {posts.length > 0 ? (
        <View style={imageCarouselStyle.wrapper}>
          <ImageCarousel featuredPosts={posts} />
        </View>
      ) : null}
      <PostList
        posts={posts}
        loading={loading}
        error={error}
        onRefresh={refetchPosts}
        emptyMessage="No Wikipedia articles found."
      />
    </View>
  );
};

export default ExplorePage;
