import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Restaurants from "./Restaurants";
import Cart from "./Cart";
import RestaurantDetails from "./RestaurantDetails";
function Home (){
  
  return(
    <Router>
    <div >
      <div className=" bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-300 h-20 ">
        <div className=" grid grid-cols-8 p-7">
          <Link className="col-span-2" to='/'>
            <img className="col-span-2 w-10 rounded-lg shadow-md" src={require('./../food_imgs/swiggy.png')} alt="Swiggy"/>
          </Link>
          <p>Swiggy Corporate</p>
          <p>Search</p>
          <p>Offers</p>
          <p>Help</p>
          <p>Sign In</p>
          <Link to = "/cart"> 
            <p>Cart</p>
          </Link>
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      </Routes>
    </div>
    </Router>
  )
}
export default Home;