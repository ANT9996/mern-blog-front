import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useRef } from "react";
import axios from "../../axios";

export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    if (!window.localStorage.getItem("token") && !isAuth) {
      navigate("/");
    }
  });

  const [imageUrl, setImageUrl] = React.useState('')
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const inputFileRef = useRef()
  const {id} = useParams()
  const isEditing = Boolean(id)
  
  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`)
      .then(({data}) => {
        console.log(data);
        setTitle(data.title)
        setImageUrl(data.imageUrl)
        setText(data.text)
        setTags(data.tags.join(','))
      })
    }
  }, []);
  const handleChangeFile = async (event) => {
    console.log(event.target.files);
    setLoading(true)
    try {
      const formData =  new FormData()
      const file = event.target.files[0]
      formData.append('image', file);
      const {data} = await axios.post('/upload', formData);
      console.log(data);
      setImageUrl(data.url)
    } catch (error) {
      console.log(error);
      alert('Ошибка загрузки файла')
    }
    setLoading(false)
  };

  const onSubmit = async () => {
    if (text.length < 10) {
      return alert('Текст статьи должен содержать в себе не менее 10 символов')
    }
    setLoading(true)
    try {
      const fields = {
        title,
        imageUrl,
        text, 
        tags: tags.split(',')
      }
      console.log(fields);
      const {data} = isEditing
      ? await axios.patch(`/posts/${id}`, fields)
      : await axios.post('/posts', fields)
      console.log(data);
      const _id = isEditing ? id : data._id
      navigate(`/posts/${_id}`)
    } catch (error) {
      console.log(error);
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
    console.log({title, text, tags:tags.split(',')});
  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги (Тэг1, Тэг2)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
