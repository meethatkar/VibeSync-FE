import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Homepage from "./features/home/pages/Homepage";
import Protected from "./components/Protected";
import SettingsPage from "./features/settings/pages/SettingsPage";
import TermsPage from "./features/home/pages/TermsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Homepage />
      </Protected>
    ),
  },
  {
    path: "/settings",
    element: (
      <Protected>
        <SettingsPage />
      </Protected>
    ),
  },
  {
    path: "/terms",
    element: (
      <Protected>
        <TermsPage />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

