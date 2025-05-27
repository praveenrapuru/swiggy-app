import { useState } from "react";
import swiggyData from "./swiggy-data.json";
import { Link } from "react-router-dom";
const images = require.context('../../public/food_imgs', true);

function Search() {
  const [query, setQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm.length >= 2) {
      const topRestaurants = swiggyData.toprastaurants ;
      const onlinefoodDelivery = swiggyData.online_food_delivery;

      const combinedRestaurants = [...topRestaurants, ...onlinefoodDelivery];

      const results = combinedRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm)
      );
      setFilteredRestaurants(results);
    } else {
      setFilteredRestaurants([]);
    }
  };
  const handleFocus = () => {
    setFilteredRestaurants(swiggyData.toprastaurants || []);
  };

  return (
    <div className="px-72">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        placeholder="Search for restaurants..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="flex items-center justify-between p-2 m-2"
          >
            <Link to={`/restaurant/${restaurant.id}`}>
            <div className="flex items-start space-x-4">
              <img
                src={images(restaurant.img)}
                alt={restaurant.name}
                className="h-20 w-26 object-cover rounded-md shadow-lg alternating"
              />
              <h2 className="text-base text-slate-600 mt-7 ">{restaurant.name}</h2>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
