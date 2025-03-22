import React from "react";
import { useOutletContext } from "react-router-dom";
import {Van, HostVanContext} from  "./HostVans";

const HostVanPricing: React.FC = () => {
  const { currentVan } = useOutletContext<HostVanContext>();
  
  return (
    <h3 className="text-3xl font-bold">
      ${currentVan.price}
      <span className="text-xl font-normal text-gray-500 ml-1">/day</span>
    </h3>
  );
};

export default HostVanPricing;