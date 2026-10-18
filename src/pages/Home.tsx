import Hero from '../components/Hero';
import Services from '../components/Services';
import WorkList from '../components/WorkList';
import About from '../components/About';
import WhatIDo from '../components/WhatIDo';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import '../components/About.css';
import '../components/Contact.css';
import '../motion/Reveal.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WorkList />
      <About />
      <Clients />
      <WhatIDo />
      <Contact />
    </>
  );
}
