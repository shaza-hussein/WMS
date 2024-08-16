import { User } from '../Context/UserContext';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartLine } from '@fortawesome/free-solid-svg-icons';

function StaffActivities() {
    const [staffActivity, setStaffActivity] = useState([]);
    const [viewAll, setViewAll] = useState(false); // New state for managing "View All"
    const context = useContext(User);
    const token = context.auth.token;

    const fetchActivityData = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/activities/', {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setStaffActivity(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error("Error fetching activity data:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        fetchActivityData();
    }, [fetchActivityData]);

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
                <p>Staff Activity</p>
                <button onClick={handleViewAll}  style={{padding:'8px 15px', color: '#fff', border: 'none', background: '#0079c1', cursor: 'pointer',height:'40px',borderRadius:'20px' }}>
                    View All
                </button>
            </div>
            <table className='customerTable'>
                <thead className='tHead'>
                    <tr>
                        <td className='customerTd'>Staff</td>
                        <td className='customerTd'>Description</td>
                        <td className='customerTd'>Activity</td>
                        <td className='customerTd'>Time</td>
                    </tr>
                </thead>
                <tbody>
                    {staffActivity.slice(0, viewAll ? staffActivity.length : 4).map((d, i) => (
                        <tr key={i}>
                            <td title={d.staff}>{truncateText(d.staff, 10)}</td>
                            <td title={d.description}>{truncateText(d.description, 15)}</td>
                            <td title={d.activity_type}><span>{truncateText(d.activity_type, 15)}</span></td>
                            <td title={d.timestamp}>{truncateText(d.timestamp, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default StaffActivities;










// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartLine } from '@fortawesome/free-solid-svg-icons';


// function StaffActivities() {

//     const [staffActivity, setStaffActivity] = useState([]);
//     const context = useContext(User);
//     const token = context.auth.token;


//     const fetchActivityData = useCallback(async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/api/activities/', {
//             headers: {
//               Accept: "application/json",
//               Authorization: "Bearer " + token,
//             },
//           });
//           setStaffActivity(response.data);
//         } catch (error) {
//           if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//           } else {
//             console.error("Error fetching activity data:", error);
//           }
//         }
//       }, [token]);
    
//       useEffect(() => {
//         fetchActivityData();
//       }, [fetchActivityData]);
//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//           return text.slice(0, maxLength) + '...';
//         }
//         return text;
//       };
//   return (
//     <>
//     <div className='cardHeader'>
//       <p>Staff Activity</p>
//       <FontAwesomeIcon icon={faChartLine} style={{ fontSize:'25px' ,color:'#0079c1'}} />
//     </div>
//         <table className='customerTable'>
//           <thead className='tHead'>
//             <tr>
//               <td className='customerTd'>Staff</td>
//               <td className='customerTd'>description</td>
//               <td className='customerTd'>activity</td>
//               <td className='customerTd'>time</td>
              
              
//             </tr>
//           </thead>
//           <tbody>
//             {staffActivity.map((d, i) => (
//               <tr key={i}>
//                 <td title={d.staff}>{truncateText(d.staff, 10)}</td>
//                 <td title={d.description}>{truncateText(d.description, 15)}</td>
//                 <td title={d.activity_type}><span>{truncateText(d.activity_type, 15)}</span></td>
//                 <td title={d.timestamp}>{truncateText(d.timestamp, 10)}</td>
                
                
//               </tr>

//             ))}
//           </tbody>
//         </table>
//       </>
//   );
  
// }

// export default StaffActivities;