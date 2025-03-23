import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import UserDetails from "./pages/userDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="users/:id" element={<UserDetails />} />
      </Route>
    </Routes>
  );
};

export default Router;
