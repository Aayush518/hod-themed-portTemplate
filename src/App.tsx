import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-black text-gray-200">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </ParallaxProvider>
  );
}

export default App;