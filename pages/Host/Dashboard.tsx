import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { getHostVans } from "../../api";

// Define TypeScript interfaces
interface Van {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description?: string;
}

const Dashboard: React.FC = () => {
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getHostVans()
      .then(data => setVans(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const renderVanElements = (vans: Van[]) => {
    const hostVansEls = vans.map((van) => (
      <div className="flex bg-white p-4 rounded-lg shadow-sm font-sans" key={van.id}>
        <img 
          src={van.imageUrl} 
          alt={`Photo of ${van.name}`} 
          className="w-24 h-24 rounded-md object-cover mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-bold text-lg">{van.name}</h3>
          <p className="text-gray-600">${van.price}/day</p>
        </div>
        <Link 
          to={`vans/${van.id}`}
          className="self-center text-blue-600 hover:text-blue-800 font-medium"
        >
          View
        </Link>
      </div>
    ));

    return (
      <div className="space-y-4 font-sans">
        <section>{hostVansEls}</section>
      </div>
    );
  };

  if (error) {
    return <h1 className="text-red-600 text-xl font-sans font-bold">Error: {error.message}</h1>;
  }

  return (
    <div className="font-sans">
      <section className="bg-orange-100 p-6 rounded-lg mb-6 flex justify-between items-center ">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
          <p className="text-gray-600 mb-1">
            Income last <span className="font-medium">30 days</span>
          </p>
          <h2 className="text-4xl font-bold">$2,260</h2>
        </div>
        <Link 
          to="income" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Details
        </Link>
      </section>
      <section className="bg-white p-6 rounded-lg mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-4">Review score</h2>
          <span className="text-yellow-400 text-xl mr-2">
            <BsStarFill />
          </span>
          <p className="text-gray-700">
            <span className="font-bold">5.0</span>/5
          </p>
        </div>
        <Link 
          to="reviews" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Details
        </Link>
      </section>
      <section className="bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your listed vans</h2>
          <Link 
            to="vans" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all
          </Link>
        </div>
        {
          loading && !vans
          ? <h1 className="text-xl font-bold text-gray-600">Loading...</h1>
          : renderVanElements(vans)
        }
      </section>
    </div>
  );
};

export default Dashboard;