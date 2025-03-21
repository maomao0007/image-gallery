import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Heart, ArrowUpFromLine } from "lucide-react";
import { useLoved } from "./LovedContext";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const { lovedPhotos, toggleLove } = useLoved();
  const isLoading = useRef(false);
  const currentPage = useRef(1);
  const listRef = useRef(null);
  const timerRef = useRef(null);   
  const apiKey = import.meta.env.VITE_PHOTO_API_KEY;

  const fetchPhotos = async (term, page = 1) => {
    try {
      isLoading.current = true;

      const url = term
        ? `https://api.pexels.com/v1/search?query=${term}&per_page=50&page=${page}`
        : `https://api.pexels.com/v1/curated?per_page=50&page=${page}`;

      const response = await axios.get(url, {
        headers: { Authorization: apiKey },
      });
      setPhotos((prePhoto) => {
        return [...prePhoto, ...response.data.photos];
      });

      setError(null);
      isLoading.current = false;

    } catch (err) {
      setError(err.message);
      isLoading.current = false;
    }
  };

  useEffect(() => {
     if (timerRef.current) {
       clearTimeout(timerRef.current);
     }

    timerRef.current = setTimeout(() => {
      setPhotos([]);
      currentPage.current = 1;
      fetchPhotos(searchTerm, 1);
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      const height =
        listRef.current.offsetHeight +
        listRef.current.offsetTop -
        window.innerHeight;
      if (!isLoading.current && window.scrollY > height) {
        currentPage.current++;
        fetchPhotos(searchTerm, currentPage.current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [searchTerm]);

  if (isLoading.current) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading photos...</p>
          <p className="text-gray-400 text-sm">Please wait a moment</p>
        </div>
      </div>
    );
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

   const scrollToTop = () => {
     window.scrollTo({ top: 0, behavior: "smooth" });
   };

  const renderPhotoItem = (photo, index) => (
    <Link to={`/photos/${photo.id}`} key={`${photo.id}-${index}`}>
      <div className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer aspect-4/3 h-64">
        <Heart
          size={24}
          fill={photo.id in lovedPhotos ? "pink" : "none"}
          onClick={(e) => {
            e.preventDefault();
            toggleLove(photo, e);
          }}
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
    <div className="max-w-7xl mx-auto px-4 relative">
      <input
        type="text"
        placeholder="Search Photo"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 mb-6 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ArrowUpFromLine
        size={40}
        className="fixed right-14 bottom-8 transform hover:scale-110 transition-transform bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-2 rounded-full shadow-lg hover:shadow-2xl transition duration-300 ease-in-out cursor-pointer z-20"
        onClick={scrollToTop}
      />

      {error && (
        <div className="mb-6 rounded-md bg-red-100 px-4 py-2 text-red-600">
          {error}
        </div>
      )}

      <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(searchTerm === "" ? photos : filterPhotos).map(renderPhotoItem)}
      </div>
    </div>
  );
};

export default Search;
