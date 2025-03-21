import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getVans } from "../../api";

// Define the Van interface
interface Van {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: string;
}

// Define the location state interface
interface LocationState {
  search?: string;
  type?: string;
}

export default function VanDetail(): React.ReactElement {
  const [van, setVan] = useState<Van | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const locationState = location.state as LocationState;

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        if (!id) throw new Error('No van ID provided');
        const data = await getVans(id);
        const van = Array.isArray(data) ? data.find(v => v.id === id) || null : data;
        if (!van) throw new Error('Van not found');
        setVan(van);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }
    
    loadVans();
  }, [id]);
  
  if (loading) {
    return <h1 className="text-2xl font-bold text-center mt-8">Loading...</h1>;
  }
  
  if (error) {
    return <h1 className="text-2xl font-bold text-center mt-8 text-red-600">There was an error: {error.message}</h1>;
  }

  const search = locationState?.search || "";
  const type = locationState?.type || "all";
  
  // Function to get the appropriate background color for van type
  const getTypeColor = (type: string): string => {
    switch (type) {
      case "simple":
        return "bg-orange-400";
      case "luxury":
        return "bg-black";
      case "rugged":
        return "bg-green-800";
      default:
        return "bg-gray-400";
    }
  };
  
  // Function to get the appropriate text color for van type
  const getTypeTextColor = (type: string): string => {
    return type === "luxury" ? "text-white" : "text-black";
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to={`..${search}`}
        relative="path"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <span className="mr-1">&larr;</span> <span>Back to {type} vans</span>
      </Link>
      
      {van && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={van.imageUrl} 
            alt={van.name} 
            className="w-full h-auto object-cover max-h-96"
          />
          <div className="p-6">
            <span className={`inline-block px-3 py-1 rounded-md text-sm font-medium mb-4 ${getTypeColor(van.type)} ${getTypeTextColor(van.type)}`}>
              {van.type}
            </span>
            <h2 className="text-3xl font-bold mb-2">{van.name}</h2>
            <p className="text-xl font-bold mb-4">
              <span>${van.price}</span>
              <span className="font-normal text-gray-600">/day</span>
            </p>
            <p className="text-gray-700 mb-6">{van.description}</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200">
              Rent this van
            </button>
          </div>
        </div>
      )}
    </div>
  );
}