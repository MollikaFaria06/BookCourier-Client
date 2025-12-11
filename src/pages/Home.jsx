import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Slider from '../components/home/Slider';
import LatestBooks from '../components/home/LatestBooks';
import CoverageMap from '../components/home/CoverageMap';
import WhyChoose from '../components/home/WhyChoose';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <Slider />
        <LatestBooks />
        <CoverageMap />
        <WhyChoose />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
