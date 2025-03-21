import React from "react";
import { Link, NavLink } from "react-router-dom";

// Make sure to import your image according to your project structure
// You might need to adjust this import path
import imageUrl from "/assets/images/avatar-icon.png";

export default function Header() {
  // Using Tailwind classes instead of inline styles
  const activeClassName = "font-bold underline text-gray-900";
  const inactiveClassName = "text-gray-600 hover:text-gray-800";

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <Link className="text-xl font-bold text-gray-900" to="/">
        #VanLife
      </Link>
      <nav className="flex items-center gap-6">
        <NavLink
          to="/host"
          className={({ isActive }) => 
            isActive ? activeClassName : inactiveClassName
          }
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => 
            isActive ? activeClassName : inactiveClassName
          }
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => 
            isActive ? activeClassName : inactiveClassName
          }
        >
          Vans
        </NavLink>
        <Link to="login" className="flex items-center">
          <img
            src={imageUrl}
            className="w-8 h-8 rounded-full"
            alt="Login"
          />
        </Link>
        <button 
          onClick={fakeLogOut} 
          className="ml-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
        >
          X
        </button>
      </nav>
    </header>
  );
}