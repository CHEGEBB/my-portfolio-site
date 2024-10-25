// components/CustomCursor.js
"use client"
import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState([]);
  
  const requestRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateCursor = () => {
      setCirclePosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1, 
        y: prev.y + (mousePosition.y - prev.y) * 0.1,
      }));

      setDotPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.2, 
        y: prev.y + (mousePosition.y - prev.y) * 0.2,
      }));

      setTrailPositions((prev) => [
        ...prev.slice(-12), 
        { x: mousePosition.x, y: mousePosition.y },
      ]);

      requestRef.current = requestAnimationFrame(animateCursor);
    };

    requestRef.current = requestAnimationFrame(animateCursor);
    return () => cancelAnimationFrame(requestRef.current);
  }, [mousePosition]);

  return (
    <>
      {/* Main cursor circle */}
      <div
        className="fixed z-50 pointer-events-none border-2 rounded-full"
        style={{
          width: '40px',
          height: '40px',
          transform: `translate3d(${circlePosition.x - 20}px, ${circlePosition.y - 20}px, 0)`,
          borderColor: 'rgba(0, 150, 255, 0.9)',
          backgroundColor: 'transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Center dot inside the circle */}
        <div
          className="absolute rounded-full bg-blue-500"
          style={{
            width: '8px',
            height: '8px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Trail effect for dynamic movement */}
      {trailPositions.map((pos, index) => (
        <div
          key={index}
          className="fixed z-40 pointer-events-none rounded-full"
          style={{
            width: `${30 - index * 2}px`,
            height: `${30 - index * 2}px`,
            transform: `translate3d(${pos.x - 15}px, ${pos.y - 15}px, 0)`,
            backgroundColor: `rgba(0, 150, 255, ${0.2 - index * 0.015})`,
            filter: 'blur(4px)',
            transition: 'transform 0.1s ease-out',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;

