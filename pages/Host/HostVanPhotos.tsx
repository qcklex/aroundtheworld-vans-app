import React from "react";
import { useOutletContext } from "react-router-dom";

// Define TypeScript interfaces
interface Van {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description: string;
}

interface ContextType {
  currentVan: Van;
}

const HostVanPhotos: React.FC = () => {
  const { currentVan } = useOutletContext<ContextType>();
  
  return (
    <img 
      src={currentVan.imageUrl} 
      alt={`Photo of ${currentVan.name}`}
      className="w-64 h-64 object-cover rounded-md" 
    />
  );
};

export default HostVanPhotos;