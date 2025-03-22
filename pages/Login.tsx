import React, { useState } from "react";
import { useLocation, useNavigate, Location } from "react-router-dom";
import { loginUser } from "../api";

interface LoginFormData {
  email: string;
  password: string;
}

interface LocationState {
  from?: string;
  message?: string;
}

const Login: React.FC = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({ 
    email: "", 
    password: "" 
  });
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<Error | null>(null);

  const location = useLocation() as Location & { state: LocationState };
  const navigate = useNavigate();

  const from = location.state?.from || "/host";
  const message = location.state?.message;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(loginFormData)
      .then(data => {
        setError(null);
        localStorage.setItem("loggedin", "true");
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }


  return (
    <div className="max-w-md mx-auto px-4 py-16 font-sans">
      {location.state?.message && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {location.state.message}
        </div>
      )}
      
      <h1 className="text-3xl font-bold text-center mb-6">Sign in to your account</h1>
      
  

      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
        <button
          disabled={status === "submitting"}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;