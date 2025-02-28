import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useLoved } from "../components/LovedContext";

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
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <Heart
            className="mx-auto h-16 w-16 text-gray-400 animate-pulse mb-6"
            strokeWidth={2}
          />
        </div>
        <div className="text-gray-600 text-2xl font-semibold mb-4">
          No Favorites Yet
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Start adding some photos to your favorites!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Explore Photos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-left p-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Gallery
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(lovedPhotos).map(([id, photo]) => (
          <Link to={`/photos/${photo.id}`} key={photo.id}>
            <div className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer aspect-4/3 h-64">
                <Heart
                  size={24}
                  fill="pink"
                  onClick={(e) => removeFromLoved(e, id)}
                  className="absolute top-4 right-4 z-10 transform hover:scale-110 transition-transform"
                />
                <img
                  src={photo.src.large2x}
                  alt={photo.photographer}
                  className="w-full h-full object-cover"
                />
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LovedPhotos;
