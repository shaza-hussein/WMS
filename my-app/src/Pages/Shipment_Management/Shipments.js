
// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faTruckField, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './Shipment.css';
// import AddShipments from './AddShipment';
// import axios from 'axios';
// import { User } from '../Context/UserContext';

// function Shipments() {
//   const [isAddShipmentOpen, setAddShipmentOpen] = useState(false);
//   const [shipments, setShipments] = useState([]);
//   // const token = 'YOUR_AUTH_TOKEN'; // استبدلها بالتوكن الحقيقي
//   const context = useContext(User);
//   const token = context.auth.token;
//   const fetchShipmentsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/shipments/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setShipments(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching shipment data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchShipmentsData();
//   }, [fetchShipmentsData]);

//   const handleAddShipmentSuccess = () => {
//     setAddShipmentOpen(false);
//     fetchShipmentsData(); // تحديث بيانات الشحنات بعد إضافة شحنة جديدة
//   };

//   const handleDeleteShipment = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/shipments/delete/${id}/`, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       fetchShipmentsData(); // تحديث بيانات الشحنات بعد حذف شحنة
//     } catch (error) {
//       console.error("Error deleting shipment:", error);
//     }
//   };

//   const handleEditShipment = (id) => {
//     // يمكنك تنفيذ منطق التعديل هنا، مثل فتح نموذج تعديل الشحنة
//     console.log("Editing shipment with id:", id);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <h2>All Shipments</h2>
//           <div style={{ display: 'flex' }}>
//             <input className='search' placeholder='Type here' />
//             <button
//               className='link-p'
//               style={{ width: '370px', backgroundColor: '#0079c1', color: '#ffffff' }}
//               onClick={() => setAddShipmentOpen(true)}
//             >
//               + Add New Shipment
//             </button>
//           </div>
//         </div>
        
//         <div className='shipments-list'>
        
//           {shipments.map(shipment => (
//             <div key={shipment.id} className='shipment-card'>
              
//               <h5>{shipment.supplier.name}</h5>
//               <p>Arrival Date: {shipment.arrival_date}</p>
//               <p>Receive Date: {shipment.receive_date ? shipment.receive_date : 'Not received yet'}</p>
//               <p>Status: {shipment.status}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleEditShipment(shipment.id)} className='edit-btn'>
//                   <FontAwesomeIcon icon={faEdit} /> 
//                 </button>
//                 <button onClick={() => handleDeleteShipment(shipment.id)} className='delete-btn'>
//                   <FontAwesomeIcon icon={faTrash} /> 
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isAddShipmentOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setAddShipmentOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <AddShipments onSuccess={handleAddShipmentSuccess} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Shipments;


// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import './Shipment.css';
// import AddShipments from './AddShipment';
// import EditShipment from './EditShipment';
// import axios from 'axios';
// import { User } from '../Context/UserContext';

// function Shipments() {
//   const [isAddShipmentOpen, setAddShipmentOpen] = useState(false);
//   const [isEditShipmentOpen, setEditShipmentOpen] = useState(false);
//   const [editShipmentId, setEditShipmentId] = useState(null);
//   const [shipments, setShipments] = useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchShipmentsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/shipments/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setShipments(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching shipment data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchShipmentsData();
//   }, [fetchShipmentsData]);

//   const handleAddShipmentSuccess = () => {
//     setAddShipmentOpen(false);
//     fetchShipmentsData(); // تحديث بيانات الشحنات بعد إضافة شحنة جديدة
//   };

//   const handleEditShipmentSuccess = () => {
//     setEditShipmentOpen(false);
//     fetchShipmentsData(); // تحديث بيانات الشحنات بعد تعديل شحنة
//   };

//   const handleDeleteShipment = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/shipments/delete/${id}/`, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       fetchShipmentsData(); // تحديث بيانات الشحنات بعد حذف شحنة
//     } catch (error) {
//       console.error("Error deleting shipment:", error);
//     }
//   };

//   const handleEditShipment = (id) => {
//     setEditShipmentId(id);
//     setEditShipmentOpen(true);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <h2>All Shipments</h2>
//           <div style={{ display: 'flex' }}>
//             <input className='search' placeholder='Type here' />
//             <button
//               className='link-p'
//               style={{ width: '370px', backgroundColor: '#0079c1', color: '#ffffff' }}
//               onClick={() => setAddShipmentOpen(true)}
//             >
//               + Add New Shipment
//             </button>
//           </div>
//         </div>
        
//         <div className='shipments-list'>
//           {shipments.map(shipment => (
//             <div key={shipment.id} className='shipment-card'>
//               <h5>{shipment.supplier.name}</h5>
//               <p>Arrival Date: {shipment.arrival_date}</p>
//               <p>Receive Date: {shipment.receive_date ? shipment.receive_date : 'Not received yet'}</p>
//               <p>Status: {shipment.status}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleEditShipment(shipment.id)} className='edit-btn'>
//                   <FontAwesomeIcon icon={faEdit} /> 
//                 </button>
//                 <button onClick={() => handleDeleteShipment(shipment.id)} className='delete-btn'>
//                   <FontAwesomeIcon icon={faTrash} /> 
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isAddShipmentOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setAddShipmentOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <AddShipments onSuccess={handleAddShipmentSuccess} />
//           </div>
//         </div>
//       )}

//       {isEditShipmentOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setEditShipmentOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <EditShipment shipmentId={editShipmentId} onSuccess={handleEditShipmentSuccess} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Shipments;


// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
// import './Shipment.css';
// import AddShipments from './AddShipment';
// import EditShipment from './EditShipment';
// import ShipmentDetails from './ShipmentDetails';
// import axios from 'axios';
// import { User } from '../Context/UserContext';

// function Shipments() {
//   const [isAddShipmentOpen, setAddShipmentOpen] = useState(false);
//   const [isEditShipmentOpen, setEditShipmentOpen] = useState(false);
//   const [isDetailsOpen, setDetailsOpen] = useState(false);
//   const [editShipmentId, setEditShipmentId] = useState(null);
//   const [detailsShipmentId, setDetailsShipmentId] = useState(null);
//   const [shipments, setShipments] = useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;

//   const fetchShipmentsData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/shipments/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setShipments(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching shipment data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchShipmentsData();
//   }, [fetchShipmentsData]);

//   const handleAddShipmentSuccess = () => {
//     setAddShipmentOpen(false);
//     fetchShipmentsData();
//   };

//   const handleEditShipmentSuccess = () => {
//     setEditShipmentOpen(false);
//     fetchShipmentsData();
//   };

//   const handleDeleteShipment = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/shipments/delete/${id}/`, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });
//       fetchShipmentsData();
//     } catch (error) {
//       console.error("Error deleting shipment:", error);
//     }
//   };

//   const handleEditShipment = (id) => {
//     setEditShipmentId(id);
//     setEditShipmentOpen(true);
//   };

//   const handleViewDetails = (id) => {
//     setDetailsShipmentId(id);
//     setDetailsOpen(true);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <h2>All Shipments</h2>
//           <div style={{ display: 'flex' }}>
//             <input className='search' placeholder='Type here' />
//             <button
//               className='link-p'
//               style={{ width: '370px', backgroundColor: '#0079c1', color: '#ffffff' }}
//               onClick={() => setAddShipmentOpen(true)}
//             >
//               + Add New Shipment
//             </button>
//           </div>
//         </div>
        
//         <div className='shipments-list'>
//           {shipments.map(shipment => (
//             <div key={shipment.id} className='shipment-card'>
//               <h5>{shipment.supplier.name}</h5>
//               <p>Arrival Date: {shipment.arrival_date}</p>
//               <p>Receive Date: {shipment.receive_date ? shipment.receive_date : 'Not received yet'}</p>
//               <p>Status: {shipment.status}</p>
//               <div className='shipment-card-actions'>
//                 <button onClick={() => handleViewDetails(shipment.id)} className='details-btn'>
//                   <FontAwesomeIcon icon={faEye} /> 
//                 </button>
//                 <button onClick={() => handleEditShipment(shipment.id)} className='edit-btn'>
//                   <FontAwesomeIcon icon={faEdit} /> 
//                 </button>
//                 <button onClick={() => handleDeleteShipment(shipment.id)} className='delete-btn'>
//                   <FontAwesomeIcon icon={faTrash} /> 
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isAddShipmentOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setAddShipmentOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <AddShipments onSuccess={handleAddShipmentSuccess} />
//           </div>
//         </div>
//       )}

//       {isEditShipmentOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setEditShipmentOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <EditShipment shipmentId={editShipmentId} onSuccess={handleEditShipmentSuccess} />
//           </div>
//         </div>
//       )}

//       {isDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setDetailsOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <ShipmentDetails shipmentId={detailsShipmentId} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Shipments;


import React, { useState, useEffect, useCallback, useContext } from 'react';
import SideMenu from '../../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit, faTrash, faEye,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Shipment.css';
import AddShipments from './AddShipment';
import EditShipment from './EditShipment';
import ShipmentDetails from './ShipmentDetails';
import axios from 'axios';
import { User } from '../Context/UserContext';

function Shipments() {
  const [isAddShipmentOpen, setAddShipmentOpen] = useState(false);
  const [isEditShipmentOpen, setEditShipmentOpen] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [editShipmentId, setEditShipmentId] = useState(null);
  const [detailsShipmentId, setDetailsShipmentId] = useState(null);
  const [shipments, setShipments] = useState([]);
  const context = useContext(User);
  const token = context.auth.token;

  const fetchShipmentsData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/shipments/', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setShipments(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error("Error fetching shipment data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchShipmentsData();
  }, [fetchShipmentsData]);

  const handleAddShipmentSuccess = () => {
    setAddShipmentOpen(false);
    fetchShipmentsData();
  };

  const handleEditShipmentSuccess = () => {
    setEditShipmentOpen(false);
    fetchShipmentsData();
  };

  const handleDeleteShipment = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/shipments/delete/${id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      fetchShipmentsData();
    } catch (error) {
      console.error("Error deleting shipment:", error);
    }
  };

  const handleEditShipment = (id) => {
    setEditShipmentId(id);
    setEditShipmentOpen(true);
  };

  const handleViewDetails = (id) => {
    setDetailsShipmentId(id);
    setDetailsOpen(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <div className='table'>
        <div className='table-header'>
          <h4>All Shipments</h4>
          <div style={{ display: 'flex' }}>
          <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
                <label>
                  <input type='text' placeholder='search here ...'/>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
                </label>
              </div>
            <button
              className='link-p'
              style={{ width: '210px', backgroundColor: '#0079c1', color: '#ffffff' }}
              onClick={() => setAddShipmentOpen(true)}
            >
              + Add New Shipment
            </button>
          </div>
        </div>
        
        <div className='shipments-list'>
          {shipments.map(shipment => (
            <div key={shipment.id} className='shipment-card'>
              <h5>{shipment.supplier.name}</h5>
              <p>Arrival Date: {shipment.arrival_date}</p>
              <p>Receive Date: {shipment.receive_date ? shipment.receive_date : 'Not received yet'}</p>
              <p>Status: {shipment.status}</p>
              <div className='shipment-card-actions'>
                <button onClick={() => handleViewDetails(shipment.id)} className='details-btn'>
                  <FontAwesomeIcon icon={faEye} /> 
                </button>
                <button onClick={() => handleEditShipment(shipment.id)} className='edit-btn'>
                  <FontAwesomeIcon icon={faEdit} /> 
                </button>
                <button onClick={() => handleDeleteShipment(shipment.id)} className='delete-btn'>
                  <FontAwesomeIcon icon={faTrash} /> 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAddShipmentOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setAddShipmentOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <AddShipments onSuccess={handleAddShipmentSuccess} />
          </div>
        </div>
      )}

      {isEditShipmentOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setEditShipmentOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <EditShipment shipmentId={editShipmentId} onSuccess={handleEditShipmentSuccess} />
          </div>
        </div>
      )}

      {isDetailsOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setDetailsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <ShipmentDetails shipmentId={detailsShipmentId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Shipments;
