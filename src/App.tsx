import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Nav from './components/Nav/Nav';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';

// Smart Scroll utility: handles top-scrolling and hash-links
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/category/:categoryId/:brandId" element={<BrandPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Nav />
        <main>
          <AnimatedRoutes />
        </main>
        <footer style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }} className="sans">
          <p>© {new Date().getFullYear()} Archive. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>
            Collaboration with <a href="https://github.com/Krocified" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', opacity: 1 }}>Michael Jong</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
