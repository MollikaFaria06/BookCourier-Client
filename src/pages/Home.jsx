import React from "react";
import Slider from "../components/home/Slider";
import LatestBooks from "../components/home/LatestBooks";
import CoverageMap from "../components/home/CoverageMap";
import WhyChoose from "../components/home/WhyChoose";
import Reviews from "../components/home/Reviews";
import Newsletter from "../components/home/NewsLetter";
import FAQ from "../components/home/FAQ";
import Blogs from "../components/home/Blogs";
import Statistics from "../components/home/Statistics";
import Services from "../components/home/Services";


const Home = () => {
      const reviewsPromise = fetch('/reviews.json').then(res => res.json());
   
    
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow">
        <Slider />
        <div className="max-w-7xl mx-auto px-4">
          <LatestBooks />
          <CoverageMap />
          <Blogs></Blogs>
          <WhyChoose />
          <Reviews reviewsOrPromise={reviewsPromise} />
          <Statistics></Statistics>
          <Services></Services>
          <FAQ></FAQ>
         <Newsletter/>
        </div>
      </main>
    </div>
  );
};

export default Home;