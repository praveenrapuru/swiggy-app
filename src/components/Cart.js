import { useState, useEffect } from "react";
import GoogleMapPicker from "./GoogleMapPicker";
import { Link } from "react-router-dom";

const images = require.context('../../public/food_imgs', true);

function Cart() {
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const storedOrders = JSON.parse(localStorage.getItem("pastOrders") || "[]");
    setPastOrders(storedOrders);
  }, []);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setPopUpOpen(false);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const increaseItem = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updatedCart[index].totalCost =
      updatedCart[index].quantity * updatedCart[index].customizations.totalCost;
    updateCart(updatedCart);
  };

  const decreaseItem = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updatedCart[index].totalCost =
        updatedCart[index].quantity * updatedCart[index].customizations.totalCost;
    } else {
      updatedCart.splice(index, 1);
    }
    updateCart(updatedCart);
  };

  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + parseFloat(item.totalCost), 0).toFixed(2);

  const handlePlaceOrder = () => {
    if (cart.length === 0)
      return alert("Your cart is empty!");

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: calculateTotal(),
    };

    const updatedPastOrders = [...pastOrders, newOrder];
    setPastOrders(updatedPastOrders);
    localStorage.setItem("pastOrders", JSON.stringify(updatedPastOrders));

    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="px-24 mt-16">
      <h2 className="text-2xl font-bold">Cart</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <img
            src={require("./../food_imgs/empty_cart.avif")}
            alt="Empty Cart"
            className="w-72 object-cover rounded-lg"
          />
          <p className="font-semibold mt-4">Your cart is empty.</p>
          <Link to="/">
            <button className="mt-4 py-2 px-6 text-white bg-orange-600 rounded-lg shadow-md">
              SEE RESTAURANTS NEAR YOU
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 mt-10">
          <div className="bg-gray-100 p-6 col-span-2 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Choose a Delivery Address</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 border-2">
                <h1>PG</h1>
                <p className="font-thin text-xs">
                  Siva Gents Luxury PG, Marathahalli, Bengaluru
                </p>
                <button className="mt-4 py-2 px-6 text-white bg-green-600 rounded-lg shadow-md">
                  DELIVER HERE
                </button>
              </div>
              <div className="border-2 p-6">
                <h1>Hostel</h1>
                <p className="font-thin text-xs">
                  Shri Shriyan Comforts, Marathahalli, Bengaluru
                </p>
                <button className="mt-4 py-2 px-6 text-white bg-green-600 rounded-lg shadow-md">
                  DELIVER HERE
                </button>
              </div>
            </div>

            <div className="outline-dashed w-80 mt-3 p-6">
              <p>Add New Address</p>
              <button
                onClick={() => setPopUpOpen(true)}
                className="mt-6 py-2 px-6 text-green-500 border-green-500 outline"
              >
                ADD NEW
              </button>
            </div>

            {location && (
              <div className="mt-6">
                <h3 className="font-semibold">Selected Location:</h3>
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
              </div>
            )}

            {popUpOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 mt-16 flex">
                <div className="bg-white w-1/3 h-full p-6 shadow-lg">
                  <div className="grid grid-cols-2">
                    <h3 className="text-lg font-semibold">Save delivery address</h3>
                    <button className="text-end" onClick={() => setPopUpOpen(false)}>
                      X
                    </button>
                  </div>
                  <GoogleMapPicker onLocationSelect={handleLocationSelect} />
                </div>
                <div className="flex-grow" onClick={() => setPopUpOpen(false)}></div>
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your Cart</h3>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b border-gray-300 last:border-none"
              >
                <h3 className="text-sm flex-grow">{item.name}</h3>
                <div className="flex items-center outline w-24 justify-center mx-4">
                  <button onClick={() => decreaseItem(index)} className="text-red-500">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => increaseItem(index)} className="text-green-600 mx-2">+</button>
                </div>
                <p>₹{item.totalCost}</p>
              </div>
            ))}
            <p className="font-semibold text-lg text-right mt-4">
              To Pay: ₹{calculateTotal()}
            </p>
            <button
              onClick={handlePlaceOrder}
              className="mt-6 py-2 px-6 text-white bg-green-600 rounded-lg shadow-md w-full"
            >
              PLACE ORDER
            </button>
          </div>
          <Link to="/orders">
            <button className="mt-6 py-2 px-6 text-white bg-green-600 rounded-lg shadow-md w-full">
              PAST ORDER
            </button>
          </Link>
        </div>
      )}
    
    </div>
  );
}

export default Cart;
