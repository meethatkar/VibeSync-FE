import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.route.jsx";
import { SongContextProvider } from "./features/home/song.context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </SongContextProvider>
    </AuthProvider>
  </StrictMode>,
);
