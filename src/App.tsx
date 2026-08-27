import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import SmoothScroll from './motion/SmoothScroll';
import PageTransition from './motion/PageTransition';
import './components/Header.css';
import './components/Footer.css';
import './components/Hero.css';
import './components/WorkList.css';

function AppRoutes() {
  const location = useLocation();
  return (
    <PageTransition>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SmoothScroll>
        <Header />
        <AppRoutes />
        <Footer />
        <BackToTop />
      </SmoothScroll>
    </BrowserRouter>
  );
}
