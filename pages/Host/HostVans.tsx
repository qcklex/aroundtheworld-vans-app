import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHostVans } from "../../api";

export interface Van {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: string;
  description: string;
  hostId: string;
}

export interface HostVanContext {
  currentVan: Van;
}

const HostVans: React.FC = () => {
    const [vans, setVans] = useState<Van[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getHostVans();
                setVans(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, []);

    const hostVansEls = vans.map((van: Van) => (
        <Link
            to={van.id}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single">
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ));

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <section>
            <h1 className="host-vans-title text-2xl font-serif">Your listed vans</h1>
            <div className="host-vans-list">
                {vans.length > 0 ? (
                    <section>{hostVansEls}</section>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        </section>

    );
};

export default HostVans;

