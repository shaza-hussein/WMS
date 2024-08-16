
import React, { useContext, useEffect, useState, useCallback } from 'react';
import SideMenu from '../../components/SideMenu';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { User } from '../Context/UserContext';
import AddStaff from './AddStaff';
import '../../Style.css'; // تأكد من وجود ملف CSS الخاص بك
import '../Products_Management/Product.css';
function Staff() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
  const context = useContext(User);
  const token = context.auth.token;

  const [isAddStaffOpen, setAddStaffOpen] = useState(false);

  const fetchStaffData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/staff/', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setRecords(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login'; 
      } else {
        console.error("Error fetching staff data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchStaffData();
  }, [fetchStaffData]);

  async function deleteStaff(id) {
    const conf = window.confirm('Do you want to disable?');
    if (conf) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/users/disable/${id}/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);
        setRecords(records.map(record => 
          record.id === id ? { ...record, is_disabled: true } : record
        ));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login'; 
        } else {
          console.error("Error disabling staff data:", error);
        }
      }
    }
  }

  const handleAddStaffSuccess = () => {
    setAddStaffOpen(false);
    fetchStaffData(); // تحديث البيانات بعد الإضافة
  };

  // تصفية السجلات بناءً على نص البحث
  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.username.toLowerCase().includes(searchLower) ||  // البحث في اسم المستخدم
      record.permitted_warehouse.name.toLowerCase().includes(searchLower)  // البحث في اسم المستودع
    );
  });

  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <div className='table'>
        <div className='table-header'>
          <h4>Our Staff</h4>
          <div style={{ display: 'flex' }}>
            <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
              <label>
                <input 
                  type='text' 
                  placeholder='Search by username or warehouse...' 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}  // تحديث حالة البحث
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
              </label>
            </div>
            <button 
              className='link-p' 
              style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff', marginLeft: '10px' }} 
              onClick={() => setAddStaffOpen(true)}
            >
              + Add New Staff
            </button>
          </div>
        </div>
       <div className='table-section'>
       <table  className='fixed'>
          <thead>
            <tr>
              <th>UserName</th>
              <th>First-Name</th>
              <th>Last-Name</th>
              <th>Warehouse-Name</th>
              <th>Warehouse-Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((d, i) => (
              <tr key={i} className={d.is_disabled ? 'disabled-row' : ''}>
                <td className='tdTableOne'>{d.username}</td>
                <td className='tdTableOne'>{d.first_name}</td>
                <td className='tdTableOne'>{d.last_name}</td>
                <td className='tdTableOne'>{d.permitted_warehouse.name}</td>
                <td className='tdTableOne'>{d.permitted_warehouse.warehouse_location}</td>
                <td className='tdTableOne'>
                  <button 
                    onClick={() => deleteStaff(d.id)} 
                    className={d.is_disabled ? 'disabled-row' : 'link-p'} 
                    disabled={d.is_disabled}
                  >
                    Disable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </div>

      {isAddStaffOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setAddStaffOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <AddStaff onSuccess={handleAddStaffSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Staff;

// import React, { useContext, useEffect, useState, useCallback } from 'react';
// import SideMenu from '../../components/SideMenu';
// import axios from 'axios';
// // import { Link } from 'react-router-dom';
//  import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { User } from '../Context/UserContext';
// import AddStaff from './AddStaff';
//   // import './Staff.css'
//  import '../../Style.css'; // تأكد من وجود ملف CSS الخاص بك

// function Staff() {
//   const [records, setRecords] = useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;

//   const [isAddStaffOpen, setAddStaffOpen] = useState(false);

//   // استخدام useCallback لتعريف fetchStaffData كدالة ثابتة
//   const fetchStaffData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/users/staff/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setRecords(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login'; 
//       } else {
//         console.error("Error fetching staff data:", error);
//       }
//     }
//   }, [token]); // token كاعتماد

//   // تضمين fetchStaffData في مصفوفة التبعيات الخاصة بـ useEffect
//   useEffect(() => {
//     fetchStaffData();
//   }, [fetchStaffData]);

//   async function deleteStaff(id) {
//     const conf = window.confirm('Do you want to disable?');
//     if (conf) {
//       try {
//         const response = await axios.delete(`http://127.0.0.1:8000/api/users/disable/${id}/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         console.log(response.data);
//         setRecords(records.map(record => 
//           record.id === id ? { ...record, is_disabled: true } : record
//         ));
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login'; 
//         } else {
//           console.error("Error disabling staff data:", error);
//         }
//       }
//     }
//   }

//   const handleAddStaffSuccess = () => {
//     setAddStaffOpen(false);
//     fetchStaffData(); // تحديث البيانات بعد الإضافة
//   };

//   return (
//     <div style={{ display:'flex' }}>
//       <SideMenu />
//       <div className='table'>
//       <div className='table-header'>
//           <p>Our Staff</p>
//           <div style={{ display: 'flex' }}>
//           <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
//                 <label>
//                   <input type='text' placeholder='search here ...'/>
//                   <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
//                 </label>
//               </div>
//             <button 
//               className='link-p' 
//               style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff' }} 
//               onClick={() => setAddStaffOpen(true)}
//             >
//               + Add New Staff
//             </button>
//           </div>
//         </div>
//         {/* ////////////////
//         <div style={{ marginBottom: '15px' }} className='text-start'>
//           <button className='btn btn-primary' onClick={() => setAddStaffOpen(true)}>Add New Staff</button>
//         </div> */}
//         <table className='table-section'>
//           <thead>
//             <tr>
//               <th>UserName</th>
//               <th>First-Name</th>
//               <th>Last-Name</th>
//               <th>Warehouse-Name</th>
//               <th>Warehouse-Location</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((d, i) => (
//               <tr key={i} className={d.is_disabled ? 'disabled-row' : ''}>
//                 <td>{d.username}</td>
//                 <td>{d.first_name}</td>
//                 <td>{d.last_name}</td>
//                 <td>{d.permitted_warehouse.name}</td>
//                 <td>{d.permitted_warehouse.warehouse_location}</td>
//                 <td>
//                   <button 
//                     onClick={() => deleteStaff(d.id)} 
//                     className={d.is_disabled ? 'disabled-row' : 'link-p'} 
//                     disabled={d.is_disabled}
//                   >
//                     Disable
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isAddStaffOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setAddStaffOpen(false)}>
//               <FontAwesomeIcon icon={faTimes} />
//             </span>
//             <AddStaff onSuccess={handleAddStaffSuccess} />
            
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Staff;



// import React, { useContext, useEffect, useState } from 'react'
// import SideMenu from '../../components/SideMenu';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { User } from '../Context/UserContext';



// function Staff() {
  
  
//   // const [columns,setColumns]= useState([]);
//   const [records,setRecords]= useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;

//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/users/staff/', {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         console.log(response.data);
//         // setColumns(Object.keys(response.data));
//         setRecords(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login'; 
//         } else {
//           console.error("Error fetching staff data:", error);
//         }
//       }
//     };
  
//     fetchStaffData();
//   }, [token]);
//   // useEffect(()=>{
//   //     axios.get('http://127.0.0.1:8000/api/users/staff/',{
//   //       headers : {
//   //         Accept: "application/json",
//   //         Authorization: "Bearer " + token,

//   //       },
//   //     }).then(res=>{
//   //       console.log(res.data);
//   //         // setColumns(Object.keys(res.data));
//   //         setRecords(res.data);
//   //     }).catch(error => {
//   //       console.error("Error fetching staff data:", error);  
//   //     });
    
//   // },[token]);
//   return (
//     <div style={{ display:'flex' }}>
//       <SideMenu/>
//       <div className='container mt-5'>
//         <div style={{ marginBottom:'15px' }} className='text-start '> <Link to='/addStaff' className='btn btn-primary'>Add New Staff</Link></div>
//         <table className='table'>
//             <thead>
//             <tr>
//                 {/* {
//                   columns.map((c,i)=>(
//                     <th key={i}>{c}</th>
//                   ))
//                 } */}
//                 <th>UserName</th>
//                 <th>First-Name</th>
//                 <th>Last-Name</th>
//                 <th>warehouse-Name</th>
//                 <th>warehouse-location</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {
//                 records.map((d,i)=>(
//                   <tr key={i}>
//                     <td>{d.username}</td>
//                     <td>{d.first_name}</td>
//                     <td>{d.last_name}</td>
//                     <td>{d.permitted_warehouse.name}</td>
//                     <td>{d.permitted_warehouse.warehouse_location}</td>
//                     <td>
//                       <button onClick={event=>{deleteStaff(d.id)}} className='btn btn-sm btn-danger'>Disable</button>
//                     </td>
//                   </tr>
//                 ))
//               }

//             </tbody>
//         </table>
//       </div>

//     </div>
//   );

//   async function deleteStaff(id){
//   const conf= window.confirm('Do you to delete');
//     if(conf){
//       try {
//         const response = await axios.delete(`http://127.0.0.1:8000/api/users/disable/${id}/`,{
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         console.log(response.data);
//           }catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login'; 
//       } else {
//         console.error("Error fetching staff data:", error);
//       }
//     }
//   };
//   }
// }

// export default Staff;