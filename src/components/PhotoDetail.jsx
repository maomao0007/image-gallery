import React from 'react'

const PhotoDetail = () => {
  return (
    
    // <div>PhotoDetail</div>

     <div
        key={photo.id}
        className="rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
      >
        <img
          src={photo.src.large2x}
          alt={photo.photographer}
          className="w-full h-full object-cover"
        />
        <div className="p-2">
        <p className="text-sm text-gray-600">By: {photo.photographer}</p>
      </div> 
      </div>
  )
}

export default PhotoDetail