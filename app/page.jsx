// HomePage.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/navbar';
import '../sass/Home.scss';

const rolesList = [
  { text: "Creative UI/UX Designer", color: "#10B981" },
  { text: "Full Stack Developer", color: "#3B82F6" },
  { text: "Digital Artist", color: "#8B5CF6" },
  { text: "Problem Solver", color: "#EC4899" }
];

const imagesList = [
  "/assets/images/1.jpeg",
  "/assets/images/2.jpeg",
  "/assets/images/3.jpeg",
  "/assets/images/4.jpeg"
];

function HomePage() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % rolesList.length);
    }, 3000);

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imagesList.length);
    }, 5000);

    return () => {
      clearInterval(roleInterval);
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center main-container">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <source src="/assets/videos/bg1.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col w-full">
            <div className="w-full">
              <NavBar />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-20">
              <motion.div 
                className="flex-1 space-y-6 intro-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow">
                  {new Date().getHours() < 12 ? "Good Morning" : 
                   new Date().getHours() < 18 ? "Good Afternoon" : 
                   "Good Evening"}, I am Brian
                </h1>
                
                <motion.h2 
                  className="text-2xl md:text-4xl font-semibold dynamic-text"
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ color: rolesList[currentRole].color }}
                >
                  I am a {rolesList[currentRole].text}
                </motion.h2>

                <div className="flex gap-4 mt-8">
                  <motion.a 
                    href="/assets/cv.pdf"
                    className="download-btn px-6 py-3 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download CV
                  </motion.a>

                  <motion.button 
                    className="hire-btn px-6 py-3 rounded-lg text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Hire Me
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                className="flex-1 relative image-right"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img 
                  key={currentImage}
                  src={imagesList[currentImage]}
                  alt="Profile"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;