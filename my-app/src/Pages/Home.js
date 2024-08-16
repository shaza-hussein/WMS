import React from 'react'
import SideMenu from '../components/SideMenu';
import { Route, Routes } from 'react-router-dom';
import Staff from './Staff_Management/Staff';
import Products from './Products_Management/Products';
 import '../Style.css';
import Orders from './Orders_Management/Orders';
import AddStaff from './Staff_Management/AddStaff';
import AddProduct from './Products_Management/AddProduct';
import EditProduct from './Products_Management/EditProduct';
import ProductDetails from './Products_Management/ProductDetails';
import Supplier from './Supplier_Management/supplier';
import Shipments from './Shipment_Management/Shipments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Locations from './Location_Management/Locations';
import Customer from './Dashboard/Customer';
import StaffActivities from './Dashboard/StaffActivities';
import SeeInventory from './Dashboard/SeeInventory';
import Wallet from './Dashboard/Wallet';
import Inventory from './Inventory_Management/Inventory';
import Reports from './Reports_Management/Reports';
import Delivery from './Dashboard/Delivery';





function Home() {
  
  return (
    <div className='content'>
      
        <SideMenu/>
        <div style={{ width:'100%' }}>
        <div className='main'>
            <div className='top-bar'>
              
              <div className='toggle'><FontAwesomeIcon icon={faBars} /></div>
          
              <div className='home-search'>
                <label>
                  <input type='text' placeholder='search here ...'/>
                  <span ><FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/></span>
                </label>
              </div>
              <div className='logo'>
                  <div className='img'></div>
                </div>
            </div>
            <div className='details'>
                 <div className='recentCustomer'><Customer/></div>
                 <div className='recentCustomer' ><Wallet/></div>
                </div>
                <div className='details'>
                 <div className='recentCustomer'><SeeInventory/></div>
                 
                </div>
                <div className='details'>
                 {/* <div className='recentCustomer'><StaffActivities/></div> */}
                 <div className='recentCustomer'><Delivery/></div>
                </div>
                <div className='details'>
                 <div className='recentCustomer'><StaffActivities/></div>
                 
                </div>
               
    
            
           
          
        </div>
        </div>
        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/staff' element={<Staff/>}/>
            <Route path='/addStaff' element={<AddStaff/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/addProduct' element={<AddProduct/>}/>
            <Route path='/editProduct' element={<EditProduct/>}/>
            <Route path='/details' element={<ProductDetails/>}/>
            <Route path='/supplier' element={<Supplier/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/reports' element={<Reports/>}/>
            <Route path='/shipments' element={<Shipments/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/locations' element={<Locations/>}/>
        
        </Routes>
    </div>
  );
}

export default Home;

