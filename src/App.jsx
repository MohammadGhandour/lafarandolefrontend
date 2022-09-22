import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./GeneralStyles/App.css";
import LeftNav from "./Components/LeftNav";
import AllProducts from "./Pages/AllProducts";
import AllSales from "./Pages/AllSales";
import AllCustomers from "./Pages/AllCustomers";
import AllUsers from "./Pages/AllUsers";
import SingleProductPage from "./Pages/SingleProductPage";
import AddProduct from "./Pages/AddProduct";
import SalesMode from "./Pages/SalesMode";
import PriceMode from "./Pages/PriceMode";
import Order from "./Pages/Order";
import Customer from "./Pages/Customer";

function App() {

  // eslint-disable-next-line
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useState();
  const token = localStorage.getItem('token');
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <div className="App">
      {token ?
        <BrowserRouter>
          <Header
            user={user}
            loaded={loaded}
            openNavbar={openNavbar}
            setOpenNavbar={setOpenNavbar} />
          <div className="pages flex">
            <LeftNav
              openNavbar={openNavbar}
              setOpenNavbar={setOpenNavbar} />
            <Routes>
              <Route path="/statistics" element={<Home />} />
              <Route path="/sales-mode" element={<SalesMode />} />
              <Route path="/price-mode" element={<PriceMode />} />
              <Route path="/" element={<AllProducts />} />
              <Route path="/all-sales" element={<AllSales />} />
              <Route path="/all-customers" element={<AllCustomers />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/customer/:id/:customerName/:customerNumber" element={<Customer />} />
              <Route path="/product/:productId" element={<SingleProductPage />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/order/:id" element={<Order />} />
            </Routes>
          </div>
        </BrowserRouter>
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
