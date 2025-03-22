import React from "react";
import { Link } from "react-router-dom";

// Import type for the image if using TypeScript with assets
// You would need to add a custom.d.ts file with proper type definitions
import bgImg from "../assets/images/about-hero.png";

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-serif">
      <img 
        src={bgImg} 
        alt="Hero image of van life" 
        className="w-full h-96 object-cover rounded-lg mb-8" 
      />
      <div className="mb-12 max-w-3xl font-sans font-thin">
        <h1 className="text-4xl font-bold mb-6">Don't squeeze in a sedan when you could relax in a van.</h1>
        <p className="text-lg mb-4">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
        <p className="text-lg">Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
      </div>
      <div className="bg-orange-100 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Your destination is waiting.<br />Your van is ready.</h2>
        <Link 
          className="inline-block bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors font-sans" 
          to="/vans"
        >
          Explore our vans
        </Link>
      </div>
    </div>
  );
};

export default About;