import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

interface Van {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: string;
}

export default function Vans(): React.ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err as Error);
  
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, []);

  const displayedVans = typeFilter
    ? vans.filter(van => van.type === typeFilter)
    : vans;

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
  
  const getTypeTextColor = (type: string): string => {
    return type === "simple" ? "text-black" : "text-white";
  };
  
  const getButtonClass = (type: string): string => {
    const baseClass = "px-4 py-2 rounded-md font-medium mr-2 mb-2";
    const activeClass = "ring-2 ring-offset-2";
    const typeClass = getTypeColor(type);
    const textClass = getTypeTextColor(type);
    
    return `${baseClass} ${typeClass} ${textClass} ${typeFilter === type ? activeClass : ""}`;
  };

  const vanElements = displayedVans.map(van => (
    <div key={van.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
      <Link
        to={van.id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter
        }}
        className="block"
      >
        <img 
          src={van.imageUrl} 
          alt={van.name} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">{van.name}</h3>
            <p className="font-bold">
              ${van.price}<span className="font-normal text-gray-600 text-sm">/day</span>
            </p>
          </div>
          <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(van.type)} ${getTypeTextColor(van.type)}`}>
            {van.type}
          </span>
        </div>
      </Link>
    </div>
  ));

  function handleFilterChange(key: string, value: string | null): void {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (loading) {
    return <h1 className="text-2xl font-bold text-center mt-8">Loading...</h1>;
  }
  
  if (error) {
    return <h1 className="text-2xl font-bold text-center mt-8 text-red-600">There was an error: {error.message}</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 font-serif">Explore our van options</h1>
      
      <div className="mb-6">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={getButtonClass("simple")}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={getButtonClass("luxury")}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={getButtonClass("rugged")}
        >
          Rugged
        </button>

        {typeFilter && (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="px-4 py-2 rounded-md font-medium mr-2 mb-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Clear filter
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vanElements}
      </div>
    </div>
  );
}