import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/axiosConfig";

const PlantCard = ({ plant, onDelete }) => {
  let date = plant.createdAt.split("T")[0];

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await api.delete(`/plants/${plant._id}`);
        toast.success("Plant deleted successfully");
        onDelete(plant._id); // Update parent state
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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqudFbQn8zgy45-DGu2ovHMYA6oiKW02uh3mU5ikLspSQAoKcetv8-AyFQXn08KdFfoWo&usqp=CAU"
          }
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        {/* Stock Status Badge */}
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
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Date :</span> {date}
          </p>
        </div>

        {/* View Details Button */}
        <div className="card-actions flex justify-between">
          <Link to={`/sell/${plant._id}`} className="btn  btn-primary">
            Sell Plants
          </Link>
          <button
            onClick={handleDelete}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
