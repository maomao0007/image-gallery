import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Camera, Heart } from "lucide-react"
import axios from "axios";
import { useLoved } from "./LovedContext";

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { lovedPhotos, toggleLove } = useLoved();
  const apiKey = import.meta.env.VITE_PHOTO_API_KEY;
    
  useEffect(() => {
    const fetchPhotoDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/photos/${id}`,
          { headers: { Authorization: apiKey } }
        );
        setPhoto(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPhotoDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-700">
        <div className="text-center p-4">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-red-700">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-700">
        <div className="text-center p-4">Photo not found</div>;
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-left p-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Gallery
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Heart
            size={24}
            fill={photo.id in lovedPhotos ? "pink" : "none"}
            onClick={(e) => toggleLove(photo, e)}
            className="absolute top-4 right-4 z-10 transform hover:scale-110 transition-transform"
          />
          <img
            src={photo.src.large}
            alt={photo.photographer}
            className="w-full aspect-[4/3] md:h-[600px] object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-gray-600 mb-4">{photo.alt}</p>
          <h2 className="text-2xl font-semibold m-2 text-gray-500 flex items-center gap-2">
            <Camera size={30} className="text-gray-500 opacity-75" />
            <span>: {photo.photographer}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
