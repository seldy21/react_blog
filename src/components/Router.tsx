import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import PostList from "../pages/posts";
import PostDetail from "../pages/posts/detail";
import PostNew from "../pages/posts/new";
import PostEdit from "../pages/posts/edit";
import ProfilePage from "../pages/profile";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/posts" element={<PostList/>} />
      <Route path="/posts/:id" element={<PostDetail/>} />
      <Route path="/posts/new" element={<PostNew/>} />
      <Route path="/posts/edit" element={<PostEdit/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default Router;
