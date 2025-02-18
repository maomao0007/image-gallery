import React from 'react'

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="text-sm text-gray-500">
          <div>© {year} Image Gallery</div>
        </div>
      </div>
    </div>
  );
}

export default Footer