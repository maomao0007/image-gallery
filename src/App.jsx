import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhotoDetail from "./components/PhotoDetail";
import LovedPhotos from "./pages/LovedPhotos";
import { LovedProvider } from "./components/LovedContext";




function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <BrowserRouter>
       <LovedProvider>
        <Header />
        <main className="container mx-auto py-8">
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/photos/:id" element={<PhotoDetail />} />
              <Route path="/favorites" element={<LovedPhotos />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        </LovedProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
