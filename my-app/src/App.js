import { Routes,Route } from "react-router-dom";
import SingUp from "./Pages/User_Management/SingUp";

import Login from "./Pages/User_Management/Login";
import Home from "./Pages/Home";
import Staff from "./Pages/Staff_Management/Staff";
import Products from "./Pages/Products_Management/Products";
import './Style.css';
import Orders from "./Pages/Orders_Management/Orders";

import AddStaff from "./Pages/Staff_Management/AddStaff";
import AddProduct from "./Pages/Products_Management/AddProduct";
import EditProduct from "./Pages/Products_Management/EditProduct";
import ProductDetails from "./Pages/Products_Management/ProductDetails";
import Supplier from "./Pages/Supplier_Management/supplier";
import Shipments from "./Pages/Shipment_Management/Shipments";
// import Inventory from "./Pages/Inventory";
import Locations from "./Pages/Location_Management/Locations";
import Inventory from "./Pages/Inventory_Management/Inventory";
import Reports from "./Pages/Reports_Management/Reports";

export default function App(){
    return(
    <div className="app">
        
        
            <Routes>


                <Route path="/" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/staff"element={<Staff/>}/>
                <Route path='/addStaff' element={<AddStaff/>}/>
                {/* <Route path='/deleteStaff' element={<DeleteStaff/>}/> */}
                <Route path="/products" element={<Products/>}/>
                <Route path="/addProduct" element={<AddProduct/>}/>
                <Route path='/editProduct' element={<EditProduct/>}/>
                <Route path='/details' element={<ProductDetails/>}/>
                <Route path='/supplier' element={<Supplier/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/reports" element={<Reports/>}/>
                <Route path="/shipments" element={<Shipments/>}/>
                <Route path="/inventory" element={<Inventory/>}/>
                <Route path="/locations" element={<Locations/>}/>
                
            </Routes>
        
            
    </div>
    );
}



