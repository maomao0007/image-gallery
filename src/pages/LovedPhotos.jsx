import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useLoved } from "../components/LovedContext";;

const LovedPhotos = () => {
  const [error, setError] = useState(null);
  const { lovedPhotos, removeFromLoved } = useLoved();

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-red-700">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  if (Object.keys(lovedPhotos).length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-700 shadow-lg">
        <div className="text-center text-2xl font-semibold p-4">
          No Favorites Yet
        </div>

        <Link
          to="/"
          className="inline-block px-4 py-2 bg-rose-300 text-white rounded-lg hover:bg-rose-200 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Explore Photos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-left p-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Gallery
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
        {Object.entries(lovedPhotos).map(([id, photo]) => (
          <Link to={`/photos/${photo.id}`} key={photo.id}>
            <div className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer">
              <div
                key={photo.id}
                className="relative rounded-lg overflow-hidden shadow-md"
              >
                <Heart
                  size={24}
                  fill="pink"
                  onClick={(e) => removeFromLoved(e, id)}
                  className="absolute top-4 right-4 z-10 transform hover:scale-110 transition-transform"
                />
                <img
                  src={photo.src.large}
                  alt={photo.photographer}
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LovedPhotos;
