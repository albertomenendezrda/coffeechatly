import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatDetail from "./pages/ChatDetail";
import JobWishlistDetail from "./pages/JobWishlistDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CompanySelection from "./pages/CompanySelection";
import CVUpload from "./pages/CVUpload";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/chat/:id",
    Component: ChatDetail,
  },
  {
    path: "/job/:id",
    Component: JobWishlistDetail,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/onboarding/companies",
    Component: CompanySelection,
  },
  {
    path: "/onboarding/cv",
    Component: CVUpload,
  },
]);