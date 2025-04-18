import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Home from "@/screens/home";
import "@/index.css";
import LoginPage from "./screens/Login";
import SignUpPage from "./screens/Signup";
import ProtectedRoute from "@/components/protectedRoute"; 
import { Toaster } from "react-hot-toast";

const paths = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={BrowserRouter} />
      <Toaster position="top-right" />
    </MantineProvider>
  );
};

export default App;
