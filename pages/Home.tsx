import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-orange-50 px-4 py-16 text-center font-sans">
      <h1 className="text-5xl font-bold mb-6 max-w-3xl">You got the travel plans, we got the travel vans.</h1>
      <p className="text-xl mb-10 max-w-2xl">Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
      <Link 
        to="vans" 
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
      >
        Find your van
      </Link>
    </div>
  );
};

export default Home;