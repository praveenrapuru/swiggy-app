import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div>
      <div className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-300 h-20">
        <div className="grid grid-cols-8 items-center p-7">
          <Link className="col-span-2 mr-10" to="/">
            <img
              className="col-span-2 w-12 h-12 rounded-lg shadow-md"
              src={require('./../food_imgs/swiggy.png')}
              alt="Swiggy"
            />
          </Link>
          <p>Swiggy Corporate</p>
          <div className="flex items-start space-x-2 text-black hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>

            <Link
              to="/search"
            >
              Search
            </Link>
          </div>
          <div className="flex items-start space-x-2 text-black hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-percent"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m15 9-6 6"/><path d="M9 9h.01"/><path d="M15 15h.01"/></svg>
            <p>Offers</p>
          </div>

          <div className="flex items-start space-x-2 text-black hover:text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-life-buoy"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
            <p>Help</p>
          </div>
          <p>Sign In</p>
          <Link to="/cart">
            <p>Cart</p>
          </Link>
        </div>
        
      </div>
      
      <div className="pt-24">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
