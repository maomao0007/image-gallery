import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl text-gray-600 mt-4">Page Not Found</h2>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Back to Homepage
      </Link>
    </div>
  );
}

export default NotFound