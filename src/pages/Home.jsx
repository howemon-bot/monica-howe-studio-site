import Hero from '../components/Hero';
import WorkList from '../components/WorkList';
import About from '../components/About';
import Contact from '../components/Contact';
import '../components/About.css';
import '../components/Contact.css';

export default function Home() {
  return (
    <>
      <Hero />
      <WorkList />
      <About />
      <Contact />
    </>
  );
}
