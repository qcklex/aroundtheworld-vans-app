import React from "react";
import { useOutletContext } from "react-router-dom";
import {Van, HostVanContext} from  "./HostVans";


const HostVanInfo: React.FC = () => {
  const { currentVan } = useOutletContext<HostVanContext>();
  
  return (
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-baseline">
        <h4 className="text-gray-700 font-bold mr-2 mb-1 md:mb-0">Name:</h4>
        <span className="text-gray-900 font-sans font-thin">{currentVan.name}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline">
        <h4 className="text-gray-700 font-bold mr-2 mb-1 md:mb-0">Category:</h4>
        <span className="text-gray-900 capitalize font-sans font-thin">{currentVan.type}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline">
        <h4 className="text-gray-700 font-bold mr-2 mb-1 md:mb-0">Description:</h4>
        <span className="text-gray-900 font-sans font-thin">{currentVan.description}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline">
        <h4 className="text-gray-700 font-bold mr-2 mb-1 md:mb-0">Visibility:</h4>
        <span className="text-gray-900 font-sans font-thin">Public</span>
      </div>
    </section>
  );
};

export default HostVanInfo;