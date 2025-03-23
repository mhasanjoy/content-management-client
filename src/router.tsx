import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Profile from "./pages/profile";
import Register from "./pages/register";
import UserDetails from "./pages/userDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
