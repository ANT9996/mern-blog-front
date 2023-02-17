import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularPosts,
  fetchPosts,
  fetchTags,
} from "../redux/slices/posts";
import axios from "../axios";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const [commentsIsLoading, setCommentsIsLoading] = React.useState(true)
  const [comments, setComments] = React.useState([]);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const [pageType, setPageType] = React.useState(0);
  React.useEffect(() => {
    if (pageType === 0) {
      dispatch(fetchPosts());
    } else {
      dispatch(fetchPopularPosts());
    }
  }, [pageType]);
  const getComments = async () => {
    const { data } = await axios.get("/comments/last");
    setComments(data);
  };
  React.useEffect(() => {
    setCommentsIsLoading(true)
    dispatch(fetchTags());
    getComments()
    setCommentsIsLoading(false)
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={pageType}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => setPageType(0)} />
        <Tab label="Популярные" onClick={() => setPageType(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, i) =>
            isPostsLoading ? (
              <Post key={i} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl && `http://localhost:4444${obj.imageUrl}`
                }
                user={obj.user}
                createdAt={obj.createdAt
                  .replace("T", "\n")
                  .replace(".", "\n")
                  .substring(0, obj.createdAt.length - 4)}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments}
            isLoading={commentsIsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
