import React from "react";
import Slider from "../components/home/Slider";
import LatestBooks from "../components/home/LatestBooks";
import CoverageMap from "../components/home/CoverageMap";
import WhyChoose from "../components/home/WhyChoose";
import Reviews from "../components/home/Reviews";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
      const reviewsPromise = fetch('/reviews.json').then(res => res.json());
   
    
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow">
        <Slider />
        <div className="max-w-7xl mx-auto px-4">
          <LatestBooks />
          <CoverageMap />
          <WhyChoose />
          <Reviews reviewsOrPromise={reviewsPromise} />
          <Newsletter />
        </div>
      </main>
    </div>
  );
};

export default Home;
