/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { getPlantById, updatePlant } from '../api/plants';

const EditPlant = () => {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "Tomato",
    stock: "",
    createdAt: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await getPlantById(plantId);
        const plantData = response;
        setFormData({
          name: plantData.name,
          type: plantData.type,
          stock: plantData.stock,
          createdAt: plantData.createdAt.split('T')[0],
          image: plantData.image || ""
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load plant data', err);
        setLoading(false);
      }
    };
    fetchPlantData();
  }, [plantId]);

  const schema = Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.min": "Variety name must be at least 3 characters long",
      "string.empty": "Variety name is required",
    }),
    type: Joi.string()
      .valid("Tomato", "Chilli", "Cabbage", "Brinjal")
      .required(),
    stock: Joi.number().min(1).required().messages({
      "number.min": "Quantity must be at least 1",
      "number.base": "Please enter a valid number",
      "any.required": "Quantity is required",
    }),
    createdAt: Joi.string().required().messages({
      "string.empty": "Date is required",
    }),
    image: Joi.string().uri().allow(""),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return;
    }

    try {
      await updatePlant(plantId, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating plant:", error);
      setErrors({ submit: "Failed to update plant. Please try again." });
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-6 text-center text-primary">
            Edit Plant
          </h1>

          {errors.submit && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plant Type */}
            <div>
              <label className="block text-gray-600 mb-2">Plant Type</label>
              <select
                value={formData.type}
                onChange={handleChange("type")}
                className="select select-bordered w-full"
              >
                <option>Tomato</option>
                <option>Chilli</option>
                <option>Cabbage</option>
                <option>Brinjal</option>
              </select>
            </div>

            {/* Variety Name */}
            <div>
              <label className="block text-gray-600 mb-2">Variety Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange("name")}
                className="input input-bordered w-full"
                required
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-600 mb-2">Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={handleChange("stock")}
                className="input input-bordered w-full"
                required
              />
              {errors.stock && (
                <p className="text-error text-sm mt-1">{errors.stock}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-600 mb-2">Date</label>
              <input
                type="date"
                value={formData.createdAt}
                onChange={handleChange("createdAt")}
                className="input input-bordered w-full"
              
              />
              {errors.createdAt && (
                <p className="text-error text-sm mt-1">{errors.createdAt}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-600 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={handleChange("image")}
                className="input input-bordered w-full"
              />
              {errors.image && (
                <p className="text-error text-sm mt-1">{errors.image}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-6 btn-block rounded-full"
            >
              Update Plant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPlant;