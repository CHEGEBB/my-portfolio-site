//home.jsx
import React from 'react';
import "../sass/Home.scss";
import Link from 'next/link';
import NavBar from '../components/navbar';

function HomePage() {
  return (
    <div className='main-container'>
      <video  autoPlay loop muted playsInline className="background-video">
        <source src="/assets/videos/bg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <div className="content">
          <div className="hero-section">
            <div className="nav">
              <NavBar/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
