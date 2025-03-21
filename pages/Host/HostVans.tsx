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

const HostVanPricing: React.FC = () => {
  const { currentVan } = useOutletContext<ContextType>();
  
  return (
    <h3 className="text-3xl font-bold">
      ${currentVan.price}
      <span className="text-xl font-normal text-gray-500 ml-1">/day</span>
    </h3>
  );
};

export default HostVanPricing;