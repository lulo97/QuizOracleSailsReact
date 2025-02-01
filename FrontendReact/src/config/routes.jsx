import { createBrowserRouter } from "react-router-dom";
import { Subjects } from "../pages/subjects/Subjects";
import { Homepage } from "../pages/homepage/Homepage";
import { AppLayout } from "../layouts/AppLayout";

export const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/subjects", element: <Subjects /> },
]);
