import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activeClassName = "font-bold underline text-gray-900";
  const inactiveClassName = "text-gray-600 hover:text-gray-800";

  useEffect(() => {
    function checkLoginStatus() {
      const loginStatus = localStorage.getItem("loggedin");
      setIsLoggedIn(!!loginStatus);
    }

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    // Check login status on route changes
    checkLoginStatus();

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]);

  function handleLogOut() {
    localStorage.removeItem("loggedin");
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleLogin(e) {
    e.preventDefault();
    // ... your login authentication logic ...
    
    localStorage.setItem("loggedin", "true");
    
    // Dispatch storage event manually
    window.dispatchEvent(new Event('storage'));
    
    navigate("/dashboard");
  }

  return (
    <header className="flex justify-between items-center p-4 bg-orange-500 shadow-sm font-serif">
      <Link className="sm:text-3xl md:text-3xl lg:text-4xl text-2xl text-gray-900 font-serif font-thin lowercase" to="/">
        #AroundTheWorld
      </Link>
      <nav className="flex items-center gap-2 font-sans">
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
        <Link to={isLoggedIn ? "/host" : "/login"}>
          <RxAvatar className="w-9 h-9 rounded-full text-black hover:opacity-80 cursor-pointer transition-opacity" />
        </Link>
        {isLoggedIn ? (
          <button 
            onClick={handleLogOut}
            className="ml-2 px-4 py-2 rounded bg-black hover:underline text-white font-thin transition-colors"
          >
            Log out
          </button>
        ) : (
          <Link to="/login" className="flex items-center">
            <button 
              className="ml-2 px-4 py-2 rounded bg-black hover:underline text-white font-thin transition-colors"
            >
              Log in
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}