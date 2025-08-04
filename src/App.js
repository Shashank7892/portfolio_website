import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Portfolio from './components/portfolio';
import Experience from "./components/experience";
import Projects from "./components/projects";
import Contact from "./components/contactme";
import { BrowserRouter,Routes,Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<>
        <Hero/>
        <About/>
        <Portfolio/>
        <Experience/>
        <Projects/>
        <Contact/>
        </> }/>
        <Route path="/home" element={<Hero/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Portfolio/>}/>
        <Route path="/experience" element={<Experience/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>
        
    </div>
    </BrowserRouter>
  );
}

export default App;
