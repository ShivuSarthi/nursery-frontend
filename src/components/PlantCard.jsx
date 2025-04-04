import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/axiosConfig";
import { useMemo } from "react"; // Added useMemo

const PlantCard = ({ plant, onDelete }) => {
  // Memoize date calculation
  const formattedDate = useMemo(() => {
    if (!plant.createdAt) return "N/A";
    const date = new Date(plant.createdAt);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [plant.createdAt]);

  // Memoize days calculation
  const daysSinceCreation = useMemo(() => {
    if (!plant.createdAt) return 0;
    const createdDate = new Date(plant.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [plant.createdAt]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await api.delete(`/plants/${plant._id}`);
        toast.success("Plant deleted successfully");
        onDelete(plant._id);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete plant");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Plant Image */}
      <div className="h-48 relative">
        <img
          src={
            plant.image ||
            "https://thebftonline.com/wp-content/uploads/2021/06/plant-1.jpg"
          }
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-md">
          {plant.stock} in stock
        </span>
      </div>

      {/* Plant Details */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {plant.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{plant.description}</p>

        {/* Growth Requirements */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Type:</span> {plant.type}
          </p>
        </div>
        <div className="mb-4 flex justify-between">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Days:</span> {daysSinceCreation}
          </p>
        </div>

        {/* View Details Button */}
        <div className="card-actions flex justify-between">
          <Link to={`/sell/${plant._id}`} className="btn btn-primary">
            Sell Plants
          </Link>
          <div className="space-x-2">
            <Link to={`/edit/${plant._id}`} className="btn bg-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>

            <button onClick={handleDelete} className="btn bg-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
