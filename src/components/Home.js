import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Search, Crown, BadgePercent, LifeBuoy, User, ShoppingBag } from 'lucide-react';
import swiggyLogo from './../food_imgs/swiggy.png'; 

function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div>
      <div className="bg-white px-14 fixed w-full z-20 top-0 start-0 border-b border-gray-300 h-20">
        <div className="grid grid-cols-8 items-center p-7">
          <Link className="col-span-2" to="/">
            <img
              className="col-span-2 w-12 h-12 rounded-lg shadow-md"
              src={swiggyLogo}
              alt="Swiggy"
            />
          </Link>
          <div className="flex items-start space-x-2  text-black hover:text-orange-600">
            <Crown width={20} />
            <p>Swiggy Corporate</p>
          </div>
          <div className="flex items-start space-x-2 ml-9 text-black hover:text-orange-600">
            <Search width={20} />
            <Link to="/search">Search</Link>
          </div>
          <div className="flex items-start space-x-2 text-black hover:text-orange-600">
            <BadgePercent width={20} />
            <p>Offers</p>
          </div>
          <div className="flex items-start space-x-2 text-black hover:text-orange-600">
            <LifeBuoy width={20} />
            <p>Help</p>
          </div>
          <div
            className="flex items-start space-x-2 text-black hover:text-orange-600 relative"
            onMouseEnter={() => setShowPopup(true)} 
            onMouseLeave={() => setShowPopup(false)} 
          >
            <User width={20} />
            <p>Test User</p>

            {showPopup && (
              <div
                className="absolute bg-white text-slate-700 text-sm rounded-lg p-2 shadow-lg w-48 top-full left-1/2 transform -translate-x-1/2"
                onMouseEnter={() => setShowPopup(true)}  
                onMouseLeave={() => setShowPopup(false)} 
              >
                <Link to="/orders" className="block px-2 py-1 hover:text-black ">Orders</Link>
                
              </div>
            )}
          </div>
          <Link className="flex items-start space-x-2 text-black hover:text-orange-600" to="/cart">
            <ShoppingBag width={20} />
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
