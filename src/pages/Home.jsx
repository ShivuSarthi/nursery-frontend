import { useEffect, useState } from "react";
import { getPlants } from "../api/plants.jsx";
import PlantCard from "../components/PlantCard.jsx";

const Home = () => {
  const [plants, setPlants] = useState([]);

  const handleDeletePlant = (deletedId) => {
    setPlants(plants.filter((plant) => plant._id !== deletedId));
  };

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getPlants();
        setPlants(data);
      } catch (error) {
        console.error("Failed to load plants:", error);
      }
    };
    fetchPlants();
  }, []);

  return (
    <div className="pt-24">
      {" "}
      {/* Offset for fixed header */}
      {/* Hero Section */}
      <div className="relative h-52">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-overhead-of-various-colorful-succulent-plants-at-nursery-image_15686185.jpg"
          alt="Nursery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">
              Grow Your Plants with Us
            </h1>
            <p className="text-xl">Fresh, Organic Plants Delivered to You</p>
          </div>
        </div>
      </div>
      {/* Plant Categories */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-center ">
          <h2 className="text-3xl font-bold mb-8 text-primary">
            Plant Batch's
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plants.map((plant) => (
            <PlantCard
              key={plant._id}
              plant={plant}
              onDelete={handleDeletePlant}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
