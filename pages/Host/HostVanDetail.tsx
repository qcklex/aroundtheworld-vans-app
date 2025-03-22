import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink, Outlet, useOutletContext } from "react-router-dom";
import { getHostVans } from "../../api";
import {Van, HostVanContext} from  "./HostVans";
// Define TypeScript interfaces


const HostVanDetail: React.FC = () => {
  const [currentVan, setCurrentVan] = useState<Van| null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getHostVans(id);
        const van = Array.isArray(data) ? data.find(v => v.id === id) || null : data;
        setCurrentVan(van);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, [id]);

  if (loading) {
    return <h1 className="text-xl font-bold text-center py-8">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-red-600 text-xl font-bold text-center py-8">There was an error: {error.message}</h1>;
  }

  const typeColorClasses = {
    simple: "bg-orange-200 text-orange-800",
    luxury: "bg-black text-white",
    rugged: "bg-green-200 text-green-800"
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to=".."
        relative="path"
        className="inline-flex items-center text-black hover:underline mb-6"
      >
        <span className="mr-1">&larr;</span> <span>Back to all vans</span>
      </Link>
      {currentVan && (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <img 
              src={currentVan.imageUrl} 
              alt={currentVan.name}
              className="w-full md:w-64 h-56 md:h-auto object-cover rounded-md"  
            />
            <div>
              <span 
                className={`inline-block px-3 py-1 rounded-md text-sm font-medium mb-4 ${currentVan.type in typeColorClasses ? 
                  typeColorClasses[currentVan.type as keyof typeof typeColorClasses] : 
                  "bg-gray-200 text-gray-800"}`}
              >
                {currentVan.type}
              </span>
              <h3 className="text-2xl font-bold mb-2">{currentVan.name}</h3>
              <h4 className="text-xl mb-4">${currentVan.price}/day</h4>
            </div>
          </div>

          <nav className="flex border-b border-gray-200 px-6">
            <NavLink
              to="."
              end
              className={({ isActive }) => 
                `py-3 px-4 mr-4 font-medium ${isActive ? 
                  "border-b-2 border-black font-bold" : 
                  "text-gray-600 hover:text-black"}`
              }
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              className={({ isActive }) => 
                `py-3 px-4 mr-4 font-medium ${isActive ? 
                  "border-b-2 border-black font-bold" : 
                  "text-gray-600 hover:text-black"}`
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="photos"
              className={({ isActive }) => 
                `py-3 px-4 mr-4 font-medium ${isActive ? 
                  "border-b-2 border-black font-bold" : 
                  "text-gray-600 hover:text-black"}`
              }
            >
              Photos
            </NavLink>
          </nav>
          <div className="p-6">
            <Outlet context={{ currentVan } as HostVanContext} />
          </div>
        </div>
      )}
    </section>
  );
};

export default HostVanDetail;