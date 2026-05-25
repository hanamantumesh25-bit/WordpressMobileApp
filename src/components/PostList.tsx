import WordPressPost from "@components/WordPressPost";
import { PostType } from "@storage/reducers/types";
import { decodeText } from "@utils/helper";
import { globalStyles } from "@utils/styles";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

interface PostListProps {
  posts: PostType[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  emptyMessage: string;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  error,
  onRefresh,
  emptyMessage,
}) => {
  return (
    <ScrollView
      style={globalStyles.scrollViewContainer}
      contentContainerStyle={globalStyles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {loading && posts.length === 0 ? (
        <View style={globalStyles.messageContainer}>
          <ActivityIndicator size="large" color="#69a1d8" />
          <Text style={globalStyles.messageText}>Loading Wikipedia...</Text>
        </View>
      ) : null}
      {error ? (
        <View style={globalStyles.messageContainer}>
          <Text style={globalStyles.errorText}>{error}</Text>
        </View>
      ) : null}
      {!loading && !error && posts.length === 0 ? (
        <View style={globalStyles.messageContainer}>
          <Text style={globalStyles.messageText}>{emptyMessage}</Text>
        </View>
      ) : null}
      {posts.map((item) => (
        <WordPressPost
          imageUrl={item.jetpack_featured_media_url}
          title={decodeText(item.title.rendered)}
          excerpt={decodeText(item.excerpt.rendered)}
          key={item.id}
        />
      ))}
    </ScrollView>
  );
};

export default PostList;
