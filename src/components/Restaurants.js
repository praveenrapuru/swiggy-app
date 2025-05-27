import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swiggyData from "./swiggy-data.json";
import { Star } from 'lucide-react';
import './img_animation.css';
const images = require.context('../../public/food_imgs', true);


function Restaurants() {
  const [displayRestaurant, setDisplayRestaurant] = useState([]);

  useEffect(() => {
    setDisplayRestaurant(swiggyData);
  }, []);



  return (
    <div className="px-56">
      <h1 className="text-xl font-bold mt-2">Top Restaurants</h1>

      <div className="overflow-x-scroll whitespace-nowrap">
        <div className="flex space-x-3">
          {displayRestaurant.toprastaurants && displayRestaurant.toprastaurants.map((restaurant) => (
            <div key={restaurant.id} className="inline-block"> 
              <Link to={`/swiggy-app/restaurant/${restaurant.id}`}>
                <div className="inline-block">
                  <div className="w-60 bg-white rounded-lg shadow-md p-4 cursor-pointer alternating">
                    <img
                      src={images(restaurant.img)}
                      alt={restaurant.name}
                      className="w-full h-48 object-cover rounded-xl shadow-lg "
                    />
                    
                    <h2 className="text-lg">{restaurant.name}</h2>
                    <div className="flex items-start space-x-2">
                    <Star width={15}  />
                    <p>{restaurant.rating}</p> <span>{restaurant.time} mm</span>
                    </div>
                    <p>{restaurant.location}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <hr className="mt-7"/>
      {/* Restaurants with online food delivery */}
      <h1 className="text-xl font-bold mt-5 ">Restaurants with online food delivery</h1>
      <div className="grid grid-cols-4 gap-4">
        {displayRestaurant.online_food_delivery &&
          displayRestaurant.online_food_delivery.map((restaurant) => (
           
              <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="w-60 bg-white rounded-lg shadow-sm p-4 alternating">
              <img
                src={images(restaurant.img)}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-lg shadow-lg "
              />
              <h2 className="text-lg">{restaurant.name}</h2>
              <div className="flex items-start space-x-2">
                  <Star width={15}  />
                  <p>{restaurant.rating}</p> <span>{restaurant.time} mm</span>
              </div>
                    <p>{restaurant.location}</p>
              </Link>
          ))}
          
      </div>
    </div>
  );
}

export default Restaurants;
