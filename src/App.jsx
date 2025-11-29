import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import StickyCTA from "./components/StickyCTA";

const router = createBrowserRouter([
  { path: "/", element: <Portfolio /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <StickyCTA />
    </>
  );
}