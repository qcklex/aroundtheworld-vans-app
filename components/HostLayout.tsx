import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  // Using Tailwind classes instead of inline styles
  const activeClassName = "font-bold underline text-gray-900";
  const inactiveClassName = "text-gray-600 hover:text-gray-800";

  return (
    <>
      <nav className="flex px-8 py-4 bg-gray-50 gap-6">
        <NavLink
          to="."
          end
          className={({ isActive }) => 
            isActive ? activeClassName : inactiveClassName
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="income"
          className={({ isActive }) => 
            isActive ? activeClassName : inactiveClassName
          }
        >
          Income
        </NavLink>
        
        <NavLink
          to="vans"
          className={({ isActive }) => 
            isActive ? activeClassName : inactiveClassName
          }
        >
          Vans
        </NavLink>

        <NavLink
          to="reviews"
          className={({ isActive }) => 
            isActive ? activeClassName : inactiveClassName
          }
        >
          Reviews
        </NavLink>
      </nav>
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
}