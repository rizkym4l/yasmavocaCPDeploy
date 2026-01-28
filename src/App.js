import React from "react";
import "./App.css";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProductSection from "./components/ProductSection";
import VideoSection from "./components/VideoSection";
import TestimonialSection from "./components/TestimonialSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductSection />
        <VideoSection />
        <TestimonialSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
