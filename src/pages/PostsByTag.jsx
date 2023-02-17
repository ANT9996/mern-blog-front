import React from "react";

import { Post } from "../components/Post";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByTag } from "../redux/slices/posts";
import { useParams } from 'react-router-dom';

const PostsByTag = () => {
  const {tag} = useParams()
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPostsByTag(tag))
    console.log('====================================');
    console.log(tag);
    console.log('====================================');
  }, []);
  return (
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
              imageUrl={obj.imageUrl && `http://localhost:4444${obj.imageUrl}`}
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
    </Grid>
  );
};

export default PostsByTag;
