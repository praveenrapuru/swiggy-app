import { useState, useEffect } from "react";

const images = require.context("../../public/food_imgs", true);

function OrderDetails() {
  const [pastOrders, setPastOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("pastOrders") || "[]");
    setPastOrders(storedOrders);
  }, []);

  const viewDetails = (order) => setSelectedOrder(order);

  return (
    <div className="px-32 mt-5">
      <h2 className="text-2xl font-bold">Past Orders</h2>

      {pastOrders.length === 0 ? (
        <p className="text-gray-500 mt-10">No past orders available.</p>
      ) : (
        <div className="mt-6">
          {pastOrders.map((order, index) => (
            <div key={index} className="flex items-center justify-between border p-7 m-7">
              <div className="flex items-start space-x-4">
                <img
                  src={images(order.items[0].img)}
                  alt={order.items[0].name}
                  className="h-28 w-36 object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{order.items[0].name}</h2>
                  <p className="text-sm text-gray-500">{order.items[0].location}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    ORDER #{order.id} | {order.date}
                  </p>
                  <button
                    className="text-orange-500 font-semibold mt-2"
                    onClick={() => viewDetails(order)}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">Delivered on {order.date}</p>
                <div className="h-5 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 mt-16 flex">
          <div className="absolute right-0 top-0 h-full w-96 bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-lg font-bold"
              >
                X
              </button>
            </div>
            <p className="mb-2">Order ID: {selectedOrder.id}</p>
            <p className="text-sm text-gray-500">Delivered on {selectedOrder.date}</p>
            <div className="mt-4">
              <h4 className="text-sm text-gray-500 mb-2">Items:</h4>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="mb-2">
                  <p className="text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              ))}
            </div>
            <p className="font-semibold text-right mt-4">
              Total: ₹{selectedOrder.total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
