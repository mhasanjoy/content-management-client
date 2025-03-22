import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
