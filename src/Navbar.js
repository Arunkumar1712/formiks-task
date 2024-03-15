import React, { useState } from "react";
import { Link } from "react-router-dom";

// Function component for the Navbar
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu open/close

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section>
      {/* Navbar container */}
      <nav className="h-16 bg-blue-950 shadow-md md:flex md:justify-center md:space-x-4 relative">
        {/* Render for smaller screens */}
        <div className="md:hidden">
          {/* Menu toggle button */}
          <button
            className="text-white m-2 p-2 font-black text-lg font-Domine hover:border-b-2"
            onClick={toggleMenu} // Toggle menu when clicked
          >
            Menu
          </button>
          {/* Render menu items if isOpen state is true */}
          {isOpen && (
            <div className="absolute bg-gray-900 z-50">
              <Link to="/home" className="text-white m-2 p-2 hover:bg-gray-600 block">
                Home
              </Link>
              <Link to="/books" className="text-white m-2 p-2 hover:bg-gray-600 block">
                Books
              </Link>
              <Link to="/authors" className="text-white m-2 p-2 hover:bg-gray-600 block">
                Authors
              </Link>
              <Link to="/add-book" className="text-white m-2 p-2 hover:bg-gray-600 block">
                New Books
              </Link>
              <Link to="/add-author" className="text-white m-2 p-2 hover:bg-gray-600 block">
                New Author
              </Link>
            </div>
          )}
        </div>
        {/* Render for larger screens */}
        <div className="hidden md:flex md:justify-center md:space-x-4">
          {/* Menu items */}
          <Link to="/home">
            <button className="text-white m-2 p-2 font-black text-lg font-Domine hover:border-b-2">
              Home
            </button>
          </Link>
          <Link to="/books">
            <button className="text-white m-2 p-2 font-black text-lg font-Domine hover:border-b-2">
              Books
            </button>
          </Link>
          <Link to="/authors">
            <button className="text-white m-2 p-2 font-black text-lg font-Domine hover:border-b-2 hover:border-gray-400">
              Authors
            </button>
          </Link>
          <Link to="/add-book">
            <button className="text-white m-2 p-2 font-black text-lg font-Domine hover:border-b-2 hover:border-gray-400">
              New Books
            </button>
          </Link>
          <Link to="/add-author">
            <button className="text-white m-2 p-2 font-black text-lg font-Domine hover:border-b-2 hover:border-gray-400">
              New Author
            </button>
          </Link>
        </div>
      </nav>
    </section>
  );
}
