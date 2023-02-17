import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import React from "react";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import PostsByTag from "./pages/PostsByTag";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tag" element={<PostsByTag />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
