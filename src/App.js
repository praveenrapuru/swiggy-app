import './App.css'; 
import Home from './components/Home'; 
import TopRestaurants from './components/Restaurants'; 
import RestaurantDetails from "./components/RestaurantDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Cart from './components/Cart';
function App() {
  return (
    <div className='container mx-auto'>
      <Home/>   
    </div>
  );
}
export default App;
