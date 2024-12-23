import { useState, useEffect } from "react";
import GoogleMapPicker from "./GoogleMapPicker";
import { Link } from "react-router-dom";
const images = require.context('../../public/food_imgs', true);
function Cart() {
  const [cart, setCart] = useState([]);
  const [location, setLocation] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [pastOrders, setPastOrders] = useState([]);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
  const viewDetails = (order) => {
    setSelectedOrder(order); 
    setOrderDetailsOpen(true); 
  }
    const closeOrderDetails = () => {
      setOrderDetailsOpen(false);
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
    <div className="px-24 mt-28">
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
          
        </div>
        
      )}
      <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Past Orders</h1>

          {pastOrders.length === 0 ? (
            <p className="text-gray-500">No past orders available.</p>
          ) : (
            pastOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between border p-7 m-7 "
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={images(order.items[0].img)}
                    alt={order.items[0].name}
                    className="h-28 w-36  object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{order.items[0].name}</h2>
                    <p className="text-sm text-gray-500">{order.items[0].location}</p>
                    <p className="text-xs text-gray-400 mt-1">ORDER #{order.id} | {order.date}</p>
                    <button
                    className="text-orange-500 font-semibold mt-2"
                    onClick={()=>viewDetails(order)}
                    >
                    VIEW DETAILS
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">Delivered on {order.date}</p>
                  <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {orderDetailsOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 mt-16 flex">
          <div
            className="absolute right-0 top-0 h-full w-96 bg-white p-6 shadow-lg transform translate-x-0 transition-transform duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <button onClick={closeOrderDetails} className="text-lg font-bold">
                X
              </button>
            </div>
            <p className="mb-2">Order ID: {selectedOrder.id}</p>
            <p className="text-sm text-gray-500">Delivered on {selectedOrder.date}</p>
            <hr className="mb-4 mt-4 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

            <div className="mt-4">
              <h4 className="text-sm text-gray-500 mb-2">Items:</h4>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="mb-2">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              ))}
            </div>
            <hr className="mb-4 mt-4 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <p className="self-start font-semibold text-right">Bill Total : ₹{selectedOrder.total}</p>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Cart;
