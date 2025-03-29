// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getPlantsByType } from '../api/plants.jsx';
// import PlantCard from '../components/PlantCard.jsx';

// const Category = () => {
//   const { type } = useParams();
//   const navigate = useNavigate();
//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const data = await getPlantsByType(type);
//         setPlants(data);
//       } catch (error) {
//         console.error('Error fetching plants:', error);
//       }
//     };
//     fetchPlants();
//   }, [type]);

//   return (
//     <div className="pt-20 px-4 md:px-8 py-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold capitalize">{type} Varieties</h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
//           >
//             Back to Home
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {plants.map(plant => (
//             <PlantCard key={plant._id} plant={plant} />
//           ))}
//         </div>

//         {plants.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">No {type} varieties found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Category;