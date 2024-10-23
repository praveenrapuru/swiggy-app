import { useParams,useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import swiggyData from "./swiggy-data.json";
import Cart from "./Cart";
function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [displayItems, setDisplayItems] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addCost, setAddCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cart,setCart] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);  
  const [toastMessage, setToastMessage] = useState(''); 
  

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    const selectedRestaurant = 
    swiggyData.toprastaurants.find((rest) => rest.id === parseInt(id)) ||
    swiggyData.online_food_delivery.find((rest) => rest.id === parseInt(id));
   
    setRestaurant(selectedRestaurant);
    setDisplayItems(swiggyData);
  }, [id]);

  if (!restaurant) {
    return null;
  }
  const openPopup = (item) => {
    setSelectedItem(item);
    setPopUp(true);
    setTotalCost(item.cost); 
  }
  const closePopup = () =>{
    setSelectedItem(null);
    setPopUp(false);
  }
  const checkboxChange = (itemCost,checked) =>{
    const newAddCost = checked ? addCost + itemCost : addCost - itemCost;
    setAddCost(newAddCost);
    setTotalCost(selectedItem.cost + newAddCost);
  }
  const addToCart = () =>{

    const newItem = {
      ...selectedItem,
      customizations: {
        addCost: addCost,
        totalCost: totalCost
      },
      quantity: 1,
      totalCost: totalCost
    };
    
    const updatedCart = [...cart, newItem];
    setCart(updatedCart);

    localStorage.setItem('cart',JSON.stringify(updatedCart));
    setToastMessage(`${cart.length + 1} items added`);  
    setToastVisible(true);
    closePopup();
    console.log(cart);
    
  }

  return (
    <div className="px-64">
      <div className="mt-28">
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <div className="mt-3 p-4 bg-gray-100 rounded-lg shadow-md">
          <p>
            {restaurant.rating} • {restaurant.time} mins
          </p>
          <p>{restaurant.location}</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl mt-4 font-bold">Items</h3>
        {displayItems.items &&
          displayItems.items.map((item) => (
            <div>
              <div className="flex flex-row items-center my-4">
                <div className="flex-1">
                  <h1 className="text-lg ">{item.name}</h1>
                  <p className="mt-2 text-gray-600"> R-{item.cost}</p>
                  <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <p class=" text-sm font-bold text-gray-900 ">{item.rating}</p>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
                <div className="ml-4 relative">
                  <img
                    src={require('./../food_imgs/chilli_paneer.jpeg')}
                    alt={item.name}
                    className="h-40 w-40 object-cover rounded-lg shadow-lg"
                  />
                  <button onClick={() => openPopup(item)} className="absolute inset-x-0 font-bold bottom-0 mx-auto py-1 text-lg text-green-500 bg-white rounded-lg w-32">
                    ADD
                  </button>
                </div>
               
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0"/>
            </div>
          ))}
      </div>

      {popUp && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-slate-200 p-6 rounded-2xl shadow-lg w-1/2 h-3/4 max-w-4xl max-h-full overflow-y-auto">
          <div className="flex justify-between items-center sticky top-0 bg-slate-200 z-10">
              <h2 className="text-xl font-bold mb-3">
                Customise as per your taste
              </h2>
              <button
                className="bg-white px-3 py-1 border rounded-full"
                onClick={closePopup}
              >
                x
              </button>
            
            </div>
            <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700"/>
            {/* Add Dessert */}
            <div>
              <h1 className="font-bold mt-3">Add Dessert</h1>
              <div className="bg-white p-3 mt-3 rounded-lg shadow-lg">
              {displayItems.add_dessert.map((item) => (
              <div className="flex justify-between items-center mt-2">
                <p className="flex-1 flex items-center">{item.name}</p>
              
                <p>R-{item.cost}</p>
                <input
                  type="checkbox"
                  className="ml-2"
                  onClick={(e)=> checkboxChange(item.cost,e.target.checked)}
                />
            </div>
            ))}
            </div>
            </div>
            {/* Add Drinks */}
            <h1 className="font-bold mt-3">Add Drinks</h1>
            <div className="bg-white p-3 mt-3 rounded-lg shadow-lg">
              {displayItems.add_drinks.map((item) => (
                <div className="flex justify-between items-center mt-2">
                  <p className="flex-1 flex items-center">{item.name}</p>
                
                  <p>R-{item.cost}</p>
                  <input
                    type="checkbox"
                    className="ml-2"
                    onClick={(e)=> checkboxChange(item.cost, e.target.checked)}
                  />
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-white p-3 border-t flex justify-between items-center">
              <h3 className="text-lg font-bold">
              ₹{totalCost}
              </h3>
              <button className="py-2 px-20 text-md text-white bg-green-700 rounded-lg" onClick={addToCart}>
               Add item to cart
              </button>
            </div>
          </div>
        </div>
      )}
       {toastVisible && (
          <div className="fixed bottom-0 px-72 bg-green-500 text-white p-3 flex justify-between items-center">
            <p>{toastMessage}</p>
            <Link to={'/cart'} className=" text-white font-semibold">
              VIEW CART
            </Link>
          </div>
        )}
    </div>
  );
}

export default RestaurantDetails;
