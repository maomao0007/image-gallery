# Photo Gallery 

A responsive photo gallery website built with React and Tailwind CSS. Users can browse curated photos from Pexels API, search for specific images, and save their favorites.

- Please visit: https://photo-gallery-m6f6.onrender.com

## Features

- Browse curated photos from Pexels
- Search functionality for finding specific images
- Pagination for browsing through photo collections
- Displays the photo description and photographer
- Add/remove photos to favorites using React Context
- Responsive grid layout with Tailwind CSS

## Tech Stack

- React
- Tailwind CSS
- Axios for API calls
- React Context for state management
- Pexels API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- Pexels API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/maomao0007/image-gallery.git
cd image-gallery
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory and add your Pexels API key
```bash
VITE_PHOTO_API_KEY=your_api_key
```

4. Start the development server
```bash
npm run dev
```

## Environment Variables
Required environment variables:

VITE_PHOTO_API_KEY: Your Pexels API key

## API Integration
The app uses the Pexels API for fetching photos:

- Curated photos endpoint: /curated
- Search endpoint: /search

## Features in Detail

Photo Gallery

- Displays a grid of photos from Pexels
- Responsive layout adapts to screen size
- Displays the photo description and photographer

Search

- Users can search for photos by keyword
- Dynamic results update

Favorites

- Add/remove photos to favorites list

## Screenshot
![homepage_image_gallery](https://github.com/user-attachments/assets/1ab53061-55aa-4e49-b9cb-a7834c863b81)
![photodetail_image_gallery](https://github.com/user-attachments/assets/dc7a68a6-c2b4-41d8-92b0-6bf1a2d60b77)
![favorites_image_gallery](https://github.com/user-attachments/assets/ffca21ae-e81d-4496-886d-da151373e377)



