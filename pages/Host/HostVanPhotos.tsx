import React from "react";
import { useOutletContext } from "react-router-dom";
import {Van, HostVanContext} from  "./HostVans";


const HostVanPhotos: React.FC = () => {
  const { currentVan } = useOutletContext<HostVanContext>();
  
  return (
    <img 
      src={currentVan.imageUrl} 
      alt={`Photo of ${currentVan.name}`}
      className="w-64 h-64 object-cover rounded-md" 
    />
  );
};

export default HostVanPhotos;