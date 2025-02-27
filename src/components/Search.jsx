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
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { lovedPhotos, toggleLove } = useLoved();
  const apiKey = import.meta.env.VITE_PHOTO_API_KEY;

  const fetchPhotos = async (term, currentPage) => {
    try {
      const url = term
        ? `https://api.pexels.com/v1/search?query=${term}&per_page=30&page=${currentPage}`
        : `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=30`;

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
  };

  const debouncedFetchPhotos = debounce((term, currentPage) => {
    fetchPhotos(term, currentPage);
  }, 500);

  useEffect(() => {
    debouncedFetchPhotos(searchTerm, page);

    return () => {
      debouncedFetchPhotos.cancel();
    };
  }, [searchTerm, page, apiKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (loading) {
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

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const renderPhotoItem = (photo) => (
    <Link to={`/photos/${photo.id}`} key={photo.id}>
      <div className="relative rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer aspect-4/3 h-64">
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
        onChange={handleSearch}
        className="w-full px-4 py-2 mb-6 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(searchTerm === "" ? photos : filterPhotos).map(renderPhotoItem)}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page <= 1}
          className="px-4 py-2 bg-slate-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed    hover:bg-slate-600"
        >
          Previous
        </button>
        <span className="text-slate-700">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-slate-500 text-white rounded-lg     hover:bg-slate-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
