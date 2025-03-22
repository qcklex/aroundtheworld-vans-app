import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow px-4 py-6 mx-auto max-w-7xl w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}