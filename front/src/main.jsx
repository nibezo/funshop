import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom";

import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: (
      <div>
        <p>404 - Not Found</p>
        <Link to="/">Back</Link>
      </div>
    ),
  },
  { path: "/main/*", element: <Main /> },
  {
    path: "/Shop",
  },
  {
    path: "/Cart",
  },
  {
    path: "/UpdateCart",
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
