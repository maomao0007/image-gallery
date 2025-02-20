import React, { createContext, useState, useContext, useEffect } from 'react';

const LovedContext = createContext();

export const LovedProvider = ({ children }) => {
  const [lovedPhotos, setLovedPhotos] = useState({});

  useEffect(() => {
    const savedLovedPhotos = localStorage.getItem("lovedPhotos");
    if (savedLovedPhotos) {
      setLovedPhotos(JSON.parse(savedLovedPhotos));
    }
  }, []);

  const toggleLove = (photo, e) => {
    e.preventDefault();
    setLovedPhotos((prev) => {
      const newState = { ...prev };
      if (photo.id in newState) {
        delete newState[photo.id];
      } else {
        newState[photo.id] = {
          id: photo.id,
          src: photo.src,
          photographer: photo.photographer,
          alt: photo.alt,
        };
      }
      localStorage.setItem("lovedPhotos", JSON.stringify(newState));
      return newState;
    });
  };

  const removeFromLoved = (e, photoId) => {
    e.preventDefault();
    const newState = { ...lovedPhotos };
    delete newState[photoId];
    localStorage.setItem("lovedPhotos", JSON.stringify(newState));
    setLovedPhotos(newState);
  };

  return (
    <LovedContext.Provider value={{ lovedPhotos, toggleLove, removeFromLoved }}>
      {children}
    </LovedContext.Provider>
  );
};

export const useLoved = () => useContext(LovedContext);