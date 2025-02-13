import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cloths from "./pages/Cloths";
import Electronics from "./pages/Electronics";
import Furnitures from "./pages/Furnitures";
import Toys from "./pages/Toys";
import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import "bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./PrivateRoute";

function App() {
  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cloths" element={<Cloths />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="furnitures" element={<Furnitures />} />
            <Route path="toys" element={<Toys />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
            <Route path="my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
   
  );
}

export default App;
