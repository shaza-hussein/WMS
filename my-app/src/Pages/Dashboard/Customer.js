import { User } from '../Context/UserContext';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [viewAll, setViewAll] = useState(false);
    const context = useContext(User);
    const token = context.auth.token;

    const fetchCustomerData = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/customers/', {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setCustomers(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error("Error fetching customer data:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        fetchCustomerData();
    }, [fetchCustomerData]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const handleViewAll = () => {
        setViewAll(true);
    };

    return (
        <>
            <div className='cardHeader'>
                <p>Our Customers</p>
                <button onClick={handleViewAll} style={{padding:'8px 15px', color: '#fff', border: 'none', background: '#0079c1', cursor: 'pointer',height:'40px',borderRadius:'20px' }}>
                    View All
                </button>
            </div>
            <table className='customerTable'>
                <thead className='tHead'>
                    <tr>
                        <td className='customerTd'>User-Name</td>
                        <td className='customerTd'>First-Name</td>
                        <td className='customerTd'>Last-Name</td>
                        <td className='customerTd'>Date Joined</td>
                    </tr>
                </thead>
                <tbody>
                    {customers.slice(0, viewAll ? customers.length : 4).map((d, i) => (
                        <tr key={i}>
                            <td title={d.username}>{truncateText(d.username, 15)}</td>
                            <td title={d.first_name}>{truncateText(d.first_name, 15)}</td>
                            <td title={d.last_name}>{truncateText(d.last_name, 15)}</td>
                            <td title={d.date_joined}>{truncateText(d.date_joined, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Customer;



// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers} from '@fortawesome/free-solid-svg-icons';

// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';


// function Customer() {
//     const [customers, setCustomers] = useState([]);
//     const context = useContext(User);
//     const token = context.auth.token;

//     const fetchCustomerData = useCallback(async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/api/users/customers/', {
//             headers: {
//               Accept: "application/json",
//               Authorization: "Bearer " + token,
//             },
//           });
//           setCustomers(response.data);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//           } else {
//             console.error("Error fetching product data:", error);
//           }
//         }
//       }, [token]);
    
//       useEffect(() => {
//         fetchCustomerData();
//       }, [fetchCustomerData]);
//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//           return text.slice(0, maxLength) + '...';
//         }
//         return text;
//       };
//   return (
//     <>
//     <div className='cardHeader'>
//       <p >Our Customer</p>
//       <FontAwesomeIcon icon={faUsers} style={{ fontSize:'25px' ,color:'#0079c1'}} />
//     </div>
//         <table className='customerTable'>
//           <thead className='tHead'>
//             <tr  >
//               <td className='customerTd' >User-Name</td>
//               <td className='customerTd'>First-Name</td>
//               <td className='customerTd'>Last-Name</td>
//               <td className='customerTd'>date_joined</td>
//               {/* <td>Role</td> */}
              
//             </tr>
//           </thead>
//           <tbody >
//             {customers.map((d, i) => (
//               <tr key={i}  >
//                 <td title={d.username}>{truncateText(d.username, 15)}</td>
//                 <td title={d.first_name}>{truncateText(d.first_name, 15)}</td>
//                 <td title={d.last_name}>{truncateText(d.last_name, 15)}</td>
//                 <td title={d.date_joined}>{truncateText(d.date_joined, 10)}</td>
//                 {/* <td><span className='status role'>{d.role}</span></td> */}
                
//               </tr>

//             ))}
//           </tbody>
//         </table>
//       </>
//   )
// }

// export default Customer;
