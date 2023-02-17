import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  addToItems,
  fetchComments,
  fetchCreateComments,
} from "./../../redux/slices/comments";
import { useSelector } from "react-redux";

export const Index = ({ postId, loading }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const { data } = useSelector((state) => state.auth);
  const onSubmit = async () => {
    try {
      loading(true)
      setValue("");
      await dispatch(fetchCreateComments({ text: value, post: postId }));
      await dispatch(fetchComments(postId))
      loading(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={data.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
