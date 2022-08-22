import ReactDOM from "react-dom/client";
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import CheckOutProduct from './containers/CheckOutProduct/CheckOutProduct';
import WishList from './containers/WishListProduct/WishListProduct';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/checkout/:id" element={<CheckOutProduct />} />
      <Route path="/wish-list" element={<WishList />} />
    </Routes>
  </Router>
);