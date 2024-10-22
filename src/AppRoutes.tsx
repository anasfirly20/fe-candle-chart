import { Routes, Route, BrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { Navbar } from "./components/navbar";

const HomePage = lazy(() => import("./pages/home"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
