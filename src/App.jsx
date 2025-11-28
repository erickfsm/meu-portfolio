import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

const router = createBrowserRouter([
  { path: "/", element: <Portfolio /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 z-50 transition ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <a
        href="https://wa.me/5531972372452"
        className="rounded-full bg-[#00c9a7] px-5 py-3 text-sm font-semibold text-[#061122] shadow-[0_20px_50px_rgba(0,201,167,0.35)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
      >
        Conversar agora
      </a>
    </div>
  );
}

<StickyCTA />