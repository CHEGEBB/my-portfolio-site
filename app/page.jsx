import React from 'react';
import "./sass/Home.scss"
import Image from 'next/image';

function HomePage() {
  return (
    <div className='bg-[#000000] min-h-screen main-container'>
        <div className="container">
            <div className="overlay">
            <Image src="/assets/images/bg.jpg" alt="hero" width={1920} height={1080} />
            </div>
        </div>
      <h1 className='text-white'>Home</h1>
    </div>
  );
}

export default HomePage;
