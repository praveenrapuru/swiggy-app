import { useState, useEffect } from "react";
import swiggyData from "./swiggy-data.json";

function Restaurants() {
  const [displayRestaurants, setDisplayRestaurants] = useState([]);

  useEffect(() => {
    setDisplayRestaurants(swiggyData);
  }, []);

  return (
    <div className="px-10">
      <h1 className="text-xl font-bold mt-20">Restaurants with online food delivery</h1>
      <div className="grid grid-cols-4 gap-4">
        {displayRestaurants.online_food_delivery &&
          displayRestaurants.online_food_delivery.map((restaurant, index) => (
            <div key={index} className="w-60 bg-white rounded-lg shadow-sm p-4">
              <img
                src={require('./../food_imgs/bakery_world.avif')}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <h2 className="text-lg">{restaurant.name}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Restaurants;
