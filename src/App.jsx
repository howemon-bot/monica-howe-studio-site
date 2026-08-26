import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import './components/Header.css';
import './components/Footer.css';
import './components/Hero.css';
import './components/WorkList.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
