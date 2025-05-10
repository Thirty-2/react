import React from "react"
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import { useEffect } from "react";
import Analytics from "./Components/Analytics";
import NewsLetter from "./Components/NewsLetter";
import Cards from "./Components/Cards";
import Footer from "./Components/Footer";

function App() {   
  useEffect(() => {
    document.body.style.backgroundColor = 'black';
    // Optional: Cleanup to reset on component unmount
    return () => {
        document.body.style.backgroundColor = '';
    };
}, []);
  
  return(
    <>
      <Navbar />
      <Hero />
      <Analytics />
      <NewsLetter/>
      <Cards />
      <Footer />

    </>
  );
}

export default App