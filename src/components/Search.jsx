import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { Heart } from "lucide-react";
import { useLoved } from "./LovedContext";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const { lovedPhotos, toggleLove } = useLoved(); 
  const apiKey = import.meta.env.VITE_PHOTO_API_KEY;

  const debouncedFetchPhotos = debounce(async (term) => {
    try {
      const url = term
        ? `https://api.pexels.com/v1/search?query=${term}&per_page=15`
        : "https://api.pexels.com/v1/curated?page=1&per_page=15";

      const response = await axios.get(url, {
        headers: { Authorization: apiKey },
      });
      setPhotos(response.data.photos);
      setError(null);
      setLoading(false); 
    } catch (err) {
      setError(err.message);
      setLoading(false); 
    }
  }, 500);

  useEffect(() => {
    debouncedFetchPhotos(searchTerm);
    return () => {
      debouncedFetchPhotos.cancel();
    };
  }, [searchTerm]);

   if (loading) {
     return (
       <div className="min-h-screen w-full flex items-center justify-center bg-gray-700">
         <div className="text-center p-4">Loading...</div>
       </div>
     );
   }

  const renderPhotoItem = (photo) => (
    <Link to={`/photos/${photo.id}`} key={photo.id}>
      <div className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer">
        <Heart
          size={24}
          fill={photo.id in lovedPhotos ? "pink" : "none"}
          onClick={(e) => toggleLove(photo, e)}
          className="absolute top-4 right-4 z-10 transform hover:scale-110 transition-transform"
        />
        <img
          src={photo.src.large2x}
          alt={photo.photographer}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );

  const filterPhotos = photos.filter((photo) =>
    photo.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <input
        type="text"
        placeholder="Search Photo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(searchTerm === "" ? photos : filterPhotos).map(renderPhotoItem)}
      </div>
    </div>
  );
};

export default Search;
