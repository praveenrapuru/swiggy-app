import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Restaurants from "./components/Restaurants";
import Cart from "./components/Cart";
import RestaurantDetails from "./components/RestaurantDetails";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="search" element={<Search />} />
          <Route index element={<Restaurants />} />
          <Route path="cart" element={<Cart />} />
          <Route path="restaurant/:id" element={<RestaurantDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
