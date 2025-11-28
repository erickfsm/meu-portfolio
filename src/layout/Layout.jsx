import Navbar from "./Navbar";
import SmoothScroll from "../components/SmoothScroll";
import BackToTopButton from "../components/BackToTopButton";

export default function Layout({ children }) {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative isolate space-y-24 pt-20 md:space-y-32 md:pt-24">
        {children}
      </main>
      <BackToTopButton />
    </SmoothScroll>
  );
}