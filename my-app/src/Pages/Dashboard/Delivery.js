import { User } from '../Context/UserContext';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPeopleCarryBox } from '@fortawesome/free-solid-svg-icons';

function Delivery() {
    const [delivery, setDelivery] = useState([]);
    const [viewAll, setViewAll] = useState(false); // New state for managing "View All"
    const context = useContext(User);
    const token = context.auth.token;

    const fetchDeliveryData = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/orders/delivery-records/', {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setDelivery(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error("Error fetching delivery data:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        fetchDeliveryData();
    }, [fetchDeliveryData]);

    const handleViewAll = () => {
        setViewAll(true);
    };

    return (
        <>
            <div className='cardHeader'>
                <p>Delivery Info </p>
                <button onClick={handleViewAll}  style={{padding:'8px 15px', color: '#fff', border: 'none', background: '#0079c1', cursor: 'pointer',height:'40px',borderRadius:'20px' }}>
                    View All
                </button>
            </div>
            <table className='customerTable'>
                <thead className='tHead'>
                    <tr>
                        <td className='customerTd'>ID</td>
                        <td className='customerTd'>Company</td>
                        <td className='customerTd'>Delivery Name</td>
                        <td className='customerTd'>Delivery Phone</td>
                        <td className='customerTd'>Assign Date</td>
                        <td className='customerTd'>Orders</td>
                    </tr>
                </thead>
                <tbody>
                    {delivery.slice(0, viewAll ? delivery.length : 4).map((d, i) => (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.delivery_company}</td>
                            <td>{d.delivery_man_name}</td>
                            <td>{d.delivery_man_phone}</td>
                            <td>{d.date_assigned}</td>
                            <td>{d.orders}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Delivery;




// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPeopleCarryBox} from '@fortawesome/free-solid-svg-icons';
// function Delivery() {

//     const [delivery, setDelivery] = useState([]);
//     const context = useContext(User);
//     const token = context.auth.token;

//     const fetchDeliveryData = useCallback(async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/api/orders/delivery-records/', {
//             headers: {
//               Accept: "application/json",
//               Authorization: "Bearer " + token,
//             },
//           });
//           setDelivery(response.data);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//           } else {
//             console.error("Error fetching delivery data:", error);
//           }
//         }
//       }, [token]);
    
//       useEffect(() => {
//         fetchDeliveryData();
//       }, [fetchDeliveryData]);
//   return (
//     <>
//     <div className='cardHeader'>
//       <p>Delivery Info </p>
//       <FontAwesomeIcon icon={faPeopleCarryBox} style={{ fontSize:'25px' ,color:'#0079c1'}}/>
//     </div>
//         <table  className='customerTable'>
//           <thead className='tHead'>
//             <tr  >
//               <td className='customerTd'>ID</td>
//               <td className='customerTd'>Company</td>
//               <td className='customerTd'>Delivery Name</td>
//               <td className='customerTd'>Delivery Phone</td>
//               <td className='customerTd'>Assign Date</td>
//               <td className='customerTd'>Orders</td>
              
//             </tr>
//           </thead>
//           <tbody >
//             {delivery.map((d, i) => (
//               <tr key={i} >
//                 <td >{d.id}</td>
//                 <td>{d.delivery_company}</td>
//                 <td>{d.delivery_man_name}</td>
//                 <td>{d.delivery_man_phone}</td>
//                 <td>{d.date_assigned}</td>
//                 <td>{d.orders}</td>
                
//               </tr>

//             ))}
//           </tbody>
//         </table>
//       </>
//   )
// }

// export default Delivery;