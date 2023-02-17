import { useState, useEffect } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth } from './../redux/slices/auth';
import { fetchComments } from "../redux/slices/comments";
export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth)
  const {comments} = useSelector(state => state.comms)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchComments(id))
    axios.get(`posts/${id}`)
    .then((r) => {
      setData(r.data);
      console.log(r.data);
      setIsLoading(false)
    })
    .catch(e => console.log(e))
  }, []);
  if (isLoading) {
    return <Post isLoading={isLoading} />
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl && `http://localhost:4444${data.imageUrl}`}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text}/>
        </p>
      </Post>
      {}
      <CommentsBlock
        items={comments.items}
        isLoading={false}
      >
        {isAuth && <Index loading={(bool) => setIsLoading(bool)} postId={data._id} />}
      </CommentsBlock>
    </>
  );
};
