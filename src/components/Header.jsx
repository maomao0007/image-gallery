import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="w-full bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 px-2">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-gray-600"
            >
              Image Gallery
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-base text-gray-800 hover:text-gray-600"
            >
              Homepage
            </Link>
            <Link
              to="/about"
              className="text-base text-gray-800 hover:text-gray-600"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header