// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import OrderDetails from './OrderDetails';
// import '../Shipment_Management/Shipment.css';

// function Orders() {

//   const [isDetailsOpen, setDetailsOpen] = useState(false);
  
//   const [detailsOrderId, setDetailsOrderId] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;

  
//   const fetchOrdersData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/orders/list-all/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setOrders(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching order data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchOrdersData();
//   }, [fetchOrdersData]);


//   const handleViewDetails = (id) => {
//     setDetailsOrderId(id);
//     setDetailsOpen(true);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>Customer's Orders</p>
//           <div style={{ display: 'flex' }}>
//           <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
//                 <label>
//                   <input type='text' placeholder='search here ...'/>
//                   <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
//                 </label>
//               </div>
//           </div>
//         </div>
        
//         <div className='shipments-list'>
//           {orders.map(orders => (
//             <div key={orders.id} className='shipment-card'>
//               <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//               <p>Customer: {orders.customer.username}</p>
//               <p>Total Price: {orders.total_price}</p>
//               </div>
//               <p>Create Date: {orders.created_at}</p>
//               <p>Deliver Date: {orders.delivered_at ? orders.receive_date : 'Not received yet'}</p>
//               <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//               <p>Priority: {orders.priority}</p>
//               <p>Status: {orders.status}</p>
//               </div>
             
              
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(orders.id)} className='details-btn'>
//                   More Details 
//                 </button>
//                 <button  className='details-btn'>
//                   prioritize 
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setDetailsOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <OrderDetails orderId={detailsOrderId} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;


import React, { useState, useEffect, useCallback, useContext } from 'react';
import SideMenu from '../../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { User } from '../Context/UserContext';
import OrderDetails from './OrderDetails';
import '../Shipment_Management/Shipment.css';

function Orders() {
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [detailsOrderId, setDetailsOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
  const context = useContext(User);
  const token = context.auth.token;

  const fetchOrdersData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/orders/list-all/', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setOrders(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error("Error fetching order data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchOrdersData();
  }, [fetchOrdersData]);

  const handleViewDetails = (id) => {
    setDetailsOrderId(id);
    setDetailsOpen(true);
  };

  const handlePrioritize = async (orderId) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/orders/prioritize/${orderId}/`, {}, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      // بعد نجاح الطلب، نقوم بتحديث حالة الطلبات
      fetchOrdersData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error("Error prioritizing order:", error);
      }
    }
  };

  // تصفية الطلبات بناءً على حالة البحث
  const filteredOrders = orders.filter(order =>
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <div className='table'>
        <div className='table-header'>
          <h4>Customer's Orders</h4>
          <div style={{ display: 'flex' }}>
            <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
              <label>
                <input 
                  type='text' 
                  placeholder='Search by status...' 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // تحديث نص البحث
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
              </label>
            </div>
          </div>
        </div>
        
        <div className='shipments-list'>
          {filteredOrders.map(order => (
            <div key={order.id} className='shipment-card'>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>Customer: {order.customer.username}</p>
                <p>Total Price: {order.total_price}</p>
              </div>
              <p>Create Date: {order.created_at}</p>
              <p>Deliver Date: {order.delivered_at ? order.delivered_at : 'Not received yet'}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>Priority: {order.priority}</p>
                <p>Status: {order.status}</p>
              </div>
              
              <div className='shipment-card-actions'>
                <button onClick={() => handleViewDetails(order.id)} className='details-btn'>
                  More Details
                </button>
                <button onClick={() => handlePrioritize(order.id)} className='details-btn'>
                  Prioritize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDetailsOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setDetailsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <OrderDetails orderId={detailsOrderId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;


// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import OrderDetails from './OrderDetails';
// import '../Shipment_Management/Shipment.css';

// function Orders() {
//   const [isDetailsOpen, setDetailsOpen] = useState(false);
//   const [detailsOrderId, setDetailsOrderId] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchOrdersData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/orders/list-all/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setOrders(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching order data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchOrdersData();
//   }, [fetchOrdersData]);

//   const handleViewDetails = (id) => {
//     setDetailsOrderId(id);
//     setDetailsOpen(true);
//   };

//   // تصفية الطلبات بناءً على حالة البحث
//   const filteredOrders = orders.filter(order =>
//     order.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>Customer's Orders</p>
//           <div style={{ display: 'flex' }}>
//             <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
//               <label>
//                 <input 
//                   type='text' 
//                   placeholder='Search by status...' 
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)} // تحديث نص البحث
//                 />
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
//               </label>
//             </div>
//           </div>
//         </div>
        
//         <div className='shipments-list'>
//           {filteredOrders.map(order => (
//             <div key={order.id} className='shipment-card'>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <p>Customer: {order.customer.username}</p>
//                 <p>Total Price: {order.total_price}</p>
//               </div>
//               <p>Create Date: {order.created_at}</p>
//               <p>Deliver Date: {order.delivered_at ? order.receive_date : 'Not received yet'}</p>
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <p>Priority: {order.priority}</p>
//                 <p>Status: {order.status}</p>
//               </div>
              
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(order.id)} className='details-btn'>
//                   More Details
//                 </button>
//                 <button className='details-btn'>
//                   Prioritize
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setDetailsOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <OrderDetails orderId={detailsOrderId} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;
