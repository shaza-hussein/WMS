import SideMenu from '../../components/SideMenu';
import { User } from '../Context/UserContext';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../Products_Management/Product.css';
import '../../Style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faRectangleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Inventory() {
    const [replenishment, setReplenishment] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
    const context = useContext(User);
    const token = context.auth.token;

    const fetchReplenishmentData = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/inventory/replenishment-requests/', {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setReplenishment(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error("Error fetching replenishment data:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        fetchReplenishmentData();
    }, [fetchReplenishmentData]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const approveRequest = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/inventory/replenishment-request/${id}/approve/`, {}, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (response.status === 200) {
                alert(response.data.detail);  // اظهار رسالة نجاح
                fetchReplenishmentData();  // تحديث البيانات بعد الموافقة
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
              window.location.href = '/login';
            } else {
              console.error("Error approving replenishment request:", error);
            }
          }
    };

    const rejectRequest = async (id) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/inventory/replenishment-request/${id}/reject/`, {}, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (response.status === 200) {
                alert(response.data.detail);  // اظهار رسالة نجاح الرفض
                fetchReplenishmentData();  // تحديث البيانات بعد الرفض
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error("Error rejecting replenishment request:", error);
            }
        }
    };

    // تصفية السجلات بناءً على نص البحث
    const filteredReplenishment = replenishment.filter(item =>
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex' }}>
            <SideMenu />
            <div className='table'>
                <div className='table-header'>
                    <h4>All Replenishment Requests</h4>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
                            <label>
                                <input 
                                    type='text' 
                                    placeholder='Search by status...' 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // تحديث حالة البحث
                                />
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='table-section'>
                    <table className='fixed'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Location</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReplenishment.map((d, i) => (
                                <tr key={i}>
                                    <td className='tdTableOne' title={d.product.name}>{truncateText(d.product.name, 12)}</td>
                                    <td className='tdTableOne'>{d.product.price}</td>
                                    <td className='tdTableOne'>{d.location.name}</td>
                                    <td className='tdTableOne'>{d.quantity}</td>
                                    <td className='tdTableOne'>{d.status}</td>
                                    <td className='tdTableOne' title={d.reason}>{truncateText(d.reason, 15)}</td>
                                    <td className='tdTableOne'>
                                        <button className='link-p' onClick={() => approveRequest(d.id)}>
                                            <FontAwesomeIcon icon={faSquareCheck} />
                                        </button>
                                        <button className='link-p' onClick={() => rejectRequest(d.id)}>
                                            <FontAwesomeIcon icon={faRectangleXmark} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Inventory;

// import SideMenu from '../../components/SideMenu';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import '../Products_Management/Product.css';
// import '../../Style.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareCheck, faRectangleXmark ,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

// function Inventory() {

//     const [replenishment, setReplenishment] = useState([]);
//     const context = useContext(User);
//     const token = context.auth.token;

//     const fetchReplenishmentData = useCallback(async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/inventory/replenishment-requests/', {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             setReplenishment(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 window.location.href = '/login';
//             } else {
//                 console.error("Error fetching replenishment data:", error);
//             }
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchReplenishmentData();
//     }, [fetchReplenishmentData]);

//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//             return text.slice(0, maxLength) + '...';
//         }
//         return text;
//     };

//     const approveRequest = async (id) => {
//         try {
//             const response = await axios.post(`http://127.0.0.1:8000/api/inventory/replenishment-request/${id}/approve/`, {}, {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             if (response.status === 200) {
//                 alert(response.data.detail);  // اظهار رسالة نجاح
//                 fetchReplenishmentData();  // تحديث البيانات بعد الموافقة
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//               window.location.href = '/login';
//             } else {
//               console.error("Error approving replenishment request:", error);
//             }
//           }
//     };

//     const rejectRequest = async (id) => {
//         try {
//             const response = await axios.post(`http://127.0.0.1:8000/api/inventory/replenishment-request/${id}/reject/`, {}, {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             if (response.status === 200) {
//                 alert(response.data.detail);  // اظهار رسالة نجاح الرفض
//                 fetchReplenishmentData();  // تحديث البيانات بعد الرفض
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 window.location.href = '/login';
//             } else {
//                 console.error("Error rejecting replenishment request:", error);
//             }
//         }
//     };

//     return (
//         <div style={{ display: 'flex' }}>
//             <SideMenu />
//             <div className='table'>
//                 <div className='table-header'>
//                     <p>All Replenishment Requests</p>
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//             <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
//               <label>
//                 <input 
//                   type='text' 
//                   placeholder='Search by category or company...' 
//                 />
//                 <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
//               </label>
//             </div>
//           </div>
//                 </div>
//                 <div className='table-section'>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Price</th>
//                                 <th>Location</th>
//                                 <th>Quantity</th>
//                                 <th>Status</th>
//                                 <th>Reason</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {replenishment.map((d, i) => (
//                                 <tr key={i}>
//                                     <td title={d.product.name}>{truncateText(d.product.name, 12)}</td>
//                                     <td>{d.product.price}</td>
//                                     <td>{d.location.name}</td>
//                                     <td>{d.quantity}</td>
//                                     <td>{d.status}</td>
//                                     <td title={d.reason}>{truncateText(d.reason, 15)}</td>
//                                     <td>
//                                         <button className='link-p' onClick={() => approveRequest(d.id)}>
//                                             <FontAwesomeIcon icon={faSquareCheck} />
//                                         </button>
//                                         <button className='link-p' onClick={() => rejectRequest(d.id)}>
//                                             <FontAwesomeIcon icon={faRectangleXmark} />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Inventory;

// import SideMenu from '../../components/SideMenu';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import '../Products_Management/Product.css';
// import '../../Style.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareCheck, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

// function Inventory() {

//     const [replenishment, setReplenishment] = useState([]);
//     const context = useContext(User);
//     const token = context.auth.token;

//     const fetchReplenishmentData = useCallback(async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/inventory/replenishment-requests/', {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             setReplenishment(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 window.location.href = '/login';
//             } else {
//                 console.error("Error fetching replenishment data:", error);
//             }
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchReplenishmentData();
//     }, [fetchReplenishmentData]);

//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//             return text.slice(0, maxLength) + '...';
//         }
//         return text;
//     };

//     const approveRequest = async (id) => {
//         try {
//             const response = await axios.post(`http://127.0.0.1:8000/api/inventory/replenishment-request/${id}/approve/`, {}, {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             if (response.status === 200) {
//                 alert(response.data.detail);  // اظهار رسالة نجاح
//                 fetchReplenishmentData();  // تحديث البيانات بعد الموافقة
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//               window.location.href = '/login';
//             } else {
//               console.error("Error approving replenishment request:", error);
//             }
//           }
//     };

//     return (
//         <div style={{ display: 'flex' }}>
//             <SideMenu />
//             <div className='table'>
//                 <div className='table-header'>
//                     <p>All Replenishment Requests</p>
//                 </div>
//                 <div className='table-section'>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Product</th>
//                                 <th>Price</th>
//                                 <th>Location</th>
//                                 <th>Quantity</th>
//                                 <th>Status</th>
//                                 <th>Reason</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {replenishment.map((d, i) => (
//                                 <tr key={i}>
//                                     <td title={d.product.name}>{truncateText(d.product.name, 12)}</td>
//                                     <td>{d.product.price}</td>
//                                     <td>{d.location.name}</td>
//                                     <td>{d.quantity}</td>
//                                     <td>{d.status}</td>
//                                     <td title={d.reason}>{truncateText(d.reason, 15)}</td>
//                                     <td>
//                                         <button className='link-p' onClick={() => approveRequest(d.id)}>
//                                             <FontAwesomeIcon icon={faSquareCheck} />
//                                         </button>
//                                         <button className='link-p'>
//                                             <FontAwesomeIcon icon={faRectangleXmark} />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Inventory;

// import SideMenu from '../../components/SideMenu';

// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import '../Products_Management/Product.css';
// import '../../Style.css';
// import "bootstrap/dist/css/bootstrap.min.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquareCheck , faRectangleXmark} from '@fortawesome/free-solid-svg-icons';

// function Inventory() {

//     const [replenishment, setReplenishment] = useState([]);
//     const context = useContext(User);
//     const token = context.auth.token;

//     const fetchReplenishmentData = useCallback(async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/api/inventory/replenishment-requests/', {
//             headers: {
//               Accept: "application/json",
//               Authorization: "Bearer " + token,
//             },
//           });
//           setReplenishment(response.data);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//           } else {
//             console.error("Error fetching replenishment data:", error);
//           }
//         }
//       }, [token]);
    
//       useEffect(() => {
//         fetchReplenishmentData();
//       }, [fetchReplenishmentData]);

//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//           return text.slice(0, maxLength) + '...';
//         }
//         return text;
//       };

//     return (
//         <div style={{ display:'flex' }}>
//             <SideMenu/>
//             <div className='table'>
//         <div className='table-header'>
//           <p>All Replenishment Requests </p>
//         </div>
//         <div className='table-section'>
//           <table>
//             <thead>
//             <tr  >
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Location</th>
//                 <th>Quantity</th>
//                 <th>Status</th>
//                 <th>Reason</th>
//                 <th>Action</th>
//             </tr>
//             </thead>
//             <tbody >
//             {replenishment.map((d, i) => (
//               <tr key={i} >
//                 <td title={d.product.name}>{truncateText(d.product.name, 12)}</td>
//                 <td >{d.product.price}</td>
//                 <td >{d.location.name}</td>
//                 <td >{d.quantity}</td>
//                 <td>{d.status}</td>
//                 <td title={d.reason}>{truncateText(d.reason, 15)}</td>
//                 <td>
//                     <button className='link-p' >
//                     <FontAwesomeIcon icon={faSquareCheck} />
//                     </button>
//                     <button className='link-p' >
//                     <FontAwesomeIcon icon={faRectangleXmark} /> 
//                     </button>
                    
//                   </td>
//               </tr>

//             ))}
//           </tbody>
//           </table>
//         </div>
//       </div>
//         </div>
//       );
// }

// export default Inventory;





