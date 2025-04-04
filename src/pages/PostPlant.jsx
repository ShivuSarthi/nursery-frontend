import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlant } from "../api/plants";
import Joi from "joi";

const PostPlant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "Tomato",
    stock: "",
    createdAt: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

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
      await createPlant(formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating plant:", error);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-6 text-center text-primary">
            Add New Batch
          </h1>

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

            {/* Description */}
            <div>
              <label className="block text-gray-600 mb-2">Date</label>
              <input
                type="date"
                value={formData.createdAt}
                onChange={handleChange("createdAt")}
                className="input input-bordered w-full"
                rows="3"
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
              Add Plant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostPlant;