import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-8">Sorry, the page you were looking for was not found.</h1>
      <Link 
        to="/" 
        className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;