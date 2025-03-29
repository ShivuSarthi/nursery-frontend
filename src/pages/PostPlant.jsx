import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlant } from "../api/plants";

const PostPlant = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "Tomato",
    quantity: "",
    description: "",
    growthRequirements: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlant(formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating plant:", error);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-6 text-center text-primary">
            Add New Batch
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2">Plant Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="select"
              >
                <option>Tomato</option>
                <option>Chilli</option>
                <option>Cabbage</option>
                <option>Brinjal</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Variety Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input input-bordered"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="input input-bordered"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input input-bordered"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="input input-bordered"
              />
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
