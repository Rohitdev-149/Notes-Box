import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import NavBar from "./components/NavBar";

const FloatingImages = () => {
  const images = [
    "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg",
    "https://img.freepik.com/free-vector/vintage-books-illustration_23-2149517450.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-book-stack-illustration_23-2149514988.jpg",
    "https://img.freepik.com/free-vector/stack-books-graphic-illustration_53876-8852.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-colorful-science-education-wallpaper_23-2148489183.jpg",
  ];

  return (
    <div className="floating-background">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          className={`floating-image image-${index + 1}`}
          style={{
            "--delay": `${index * 2}s`,
            "--duration": `${10 + index * 2}s`,
            "--scale": `${0.8 + Math.random() * 0.4}`,
          }}
        />
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="page-container">
      <FloatingImages />

      {/* Fixed Side Image */}
      <div className="fixed left-0 top-1/3 hidden 2xl:block z-10">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-book-logo-collection_23-2149331026.jpg"
          alt="Decorative book"
          className="w-40 opacity-90 transform hover:scale-105 transition-transform duration-300 side-book"
        />
      </div>

      {/* Main Content */}
      <div className="main-content pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pastes" element={<Paste />} />
          <Route path="/pastes/:pasteId" element={<ViewPaste />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
