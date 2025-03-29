import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-yellow-500">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/admin"
        className="mt-6 px-6 py-3 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg transition"
      >
        Go Back Admin Panel
      </Link>
    </div>
  );
};

export default NotFound;
