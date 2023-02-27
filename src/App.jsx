import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import "./GeneralStyles/App.css";
import LeftNav from "./Components/LeftNav";
import AllProducts from "./Pages/AllProducts";
import AllSales from "./Pages/AllSales";
import AllCustomers from "./Pages/AllCustomers";
import AllUsers from "./Pages/AllUsers";
import SingleProductPage from "./Pages/SingleProductPage";
import AddProduct from "./Pages/AddProduct";
import SalesMode from "./Pages/SalesMode";
import Order from "./Pages/Order";
import Customer from "./Pages/Customer";
import Exchange from "./Pages/Exchange";
import Expenses from "./Pages/Expenses";
import AverageProgression from "./Pages/AverageProgression";
import Promos from "./Pages/Promos";
import { useAdminContext } from "./Hooks/useAdminContext";
import { useEffect } from "react";
import Page404 from "./Pages/Page404";
import User from "./Pages/User";

function App() {

  // eslint-disable-next-line
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line
  const [user, setUser] = useState();
  const token = localStorage.getItem('token');
  const [openNavbar, setOpenNavbar] = useState(false);
  const { admin, dispatch } = useAdminContext();


  useEffect(() => {
    let isAdmin = localStorage.getItem("admin");
    if (isAdmin === 'false') {
      isAdmin = false;
    } else {
      isAdmin = true
    }
    dispatch({ type: "SET_USER_ADMIN", payload: isAdmin });
  }, [dispatch]);

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
              setOpenNavbar={setOpenNavbar}
            />
            <Routes>
              {admin && <Route path="/" element={<Dashboard />} />}
              <Route path="/sales-mode" element={<SalesMode />} />
              <Route path={admin ? "/all-products" : "/"} element={<AllProducts />} />
              <Route path="/all-sales" element={<AllSales />} />
              <Route path="/all-customers" element={<AllCustomers />} />
              {admin && <Route path="/all-users" element={<AllUsers />} />}
              {admin && <Route path="/user/:id" element={<User />} />}
              <Route path="/customer/:id/:customerName/:customerNumber" element={<Customer />} />
              <Route path="/product/:productId" element={<SingleProductPage />} />
              {admin && <Route path="/add-product" element={<AddProduct />} />}
              <Route path="/order/:id" element={<Order />} />
              <Route path="/exchange/:id" element={<Exchange />} />
              {admin && <Route path="/expenses" element={<Expenses />} />}
              {admin && <Route path="/averages-progression" element={<AverageProgression />} />}
              {admin && <Route path="/promo-codes" element={<Promos />} />}
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </BrowserRouter>
        :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
