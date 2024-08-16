
import React, { useCallback, useContext, useEffect, useState } from 'react';
import SideMenu from '../../components/SideMenu';
import '../Products_Management/Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faTimes ,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { User } from '../Context/UserContext';
import axios from 'axios';
import '../../Style.css';
import AddLocation from './AddLocation';
import EditLocation from './EditLocation';
import LocationDetails from './LocationDetails';

function Locations() {
  const context = useContext(User);
  const token = context.auth.token;
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
  const [isAddLocationOpen, setAddLocationOpen] = useState(false);
  const [isEditLocationOpen, setEditLocationOpen] = useState(false);
  const [isLocationDetailsOpen, setLocationDetailsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchLocationData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/locations/', {
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
        console.error("Error fetching location data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchLocationData();
  }, [fetchLocationData]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const handleAddLocationSuccess = () => {
    setAddLocationOpen(false);
    fetchLocationData(); // Refresh the data after adding a new location
  };

  const handleEditLocationSuccess = () => {
    setEditLocationOpen(false);
    fetchLocationData(); // Refresh the data after editing a location
  };

  const handleDeleteLocation = async (id) => {
    const conf = window.confirm('Do you want to delete this location?');
    if (conf) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/locations/delete/${id}/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        fetchLocationData(); // Refresh the data after deleting a location
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error deleting location:", error);
        }
      }
    }
  };

  const handleEditLocationClick = (location) => {
    setSelectedLocation(location);
    setEditLocationOpen(true);
  };

  const handleLocationDetailsClick = (location) => {
    setSelectedLocation(location);
    setLocationDetailsOpen(true);
  };

  // تصفية السجلات بناءً على نص البحث
  const filteredRecords = records.filter(record => 
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <div className='table'>
        <div className='table-header'>
          <h4>Location Details</h4>
          <div style={{ display: 'flex' }}>
            <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
              <label>
                <input 
                  type='text' 
                  placeholder='search here ...' 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} // تحديث حالة البحث
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
              </label>
            </div>
            <button 
              className='link-p' 
              style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff',height:'45px',borderRadius:'10px' }} 
              onClick={() => setAddLocationOpen(true)}
            >
              + Add New Location
            </button>
          </div>
        </div>
        <div className='table-section'>
          <table className='fixed'>
            <thead>
              <tr>
                <th>Area</th>
                <th>Aisle</th>
                <th>Rack</th>
                <th>Level</th>
                <th>Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((d, i) => (
                <tr key={i}>
                  <td className='tdTableOne' title={d.name}>{truncateText(d.name, 15)}</td>
                  <td className='tdTableOne' title={d.aisle}>{truncateText(d.aisle, 15)}</td>
                  <td className='tdTableOne' title={d.rack}>{truncateText(d.rack, 15)}</td>
                  <td className='tdTableOne' title={d.level}>{truncateText(d.level, 10)}</td>
                  <td className='tdTableOne'>{d.capacity}</td>
                  <td className='tdTableOne'>
                    <button className='link-p' onClick={() => handleLocationDetailsClick(d)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className='link-p' onClick={() => handleEditLocationClick(d)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className='link-p' onClick={() => handleDeleteLocation(d.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddLocationOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setAddLocationOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <AddLocation onSuccess={handleAddLocationSuccess} />
          </div>
        </div>
      )}
      {isEditLocationOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setEditLocationOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <EditLocation location={selectedLocation} onSuccess={handleEditLocationSuccess} />
          </div>
        </div>
      )}
      {isLocationDetailsOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setLocationDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <LocationDetails locationId={selectedLocation.id} onClose={() => setLocationDetailsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Locations;

// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import SideMenu from '../../components/SideMenu';
// import '../Products_Management/Product.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPenToSquare, faTrash, faTimes ,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import '../../Style.css';
// import AddLocation from './AddLocation';
// import EditLocation from './EditLocation';
// import LocationDetails from './LocationDetails';

// function Locations() {
//     const context = useContext(User);
//   const token = context.auth.token;
//   const [records, setRecords] = useState([]);
//   const [isAddLocationOpen, setAddLocationOpen] = useState(false);
//   const [isEditLocationOpen, setEditLocationOpen] = useState(false);
//   const [isLocationDetailsOpen, setLocationDetailsOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const fetchLocationData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/locations/', {
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
//         console.error("Error fetching location data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchLocationData();
//   }, [fetchLocationData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleAddLocationSuccess = () => {
//     setAddLocationOpen(false);
//     fetchLocationData(); // Refresh the data after adding a new product
//   };

//   const handleEditLocationSuccess = () => {
//     setEditLocationOpen(false);
//     fetchLocationData(); // Refresh the data after editing a product
//   };

//   const handleDeleteLocation = async (id) => {
//     const conf = window.confirm('Do you want to delete this product?');
//     if (conf) {
//       try {
//         await axios.delete(`http://127.0.0.1:8000/api/locations/delete/${id}/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         fetchLocationData(); // Refresh the data after deleting a product
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login';
//         } else {
//           console.error("Error deleting product:", error);
//         }
//       }
//     }
//   };

//   const handleEditLocationClick = (location) => {
//     setSelectedLocation(location);
//     setEditLocationOpen(true);
//   };

//   const handleLocationDetailsClick = (location) => {
//     setSelectedLocation(location);
//     setLocationDetailsOpen(true);
//   };
//     return (
//         <div style={{ display: "flex" }}>
//           <SideMenu />
//           <div className='table'>
//             <div className='table-header'>
//               <p>Product Details</p>
//               <div style={{ display: 'flex' }}>
//               <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
//                     <label>
//                       <input type='text' placeholder='search here ...'/>
//                       <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
//                     </label>
//                   </div>
//                 <button 
//                   className='link-p' 
//                   style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff',height:'45px',borderRadius:'10px' }} 
//                   onClick={() => setAddLocationOpen(true)}
//                 >
//                   + Add New Location
//                 </button>
//               </div>
//             </div>
//             <div className='table-section'>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Aisle</th>
//                     <th>Rack</th>
//                     <th>Level</th>
//                     <th>Capacity</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {records.map((d, i) => (
//                     <tr key={i}>
//                       <td title={d.name}>{truncateText(d.name, 15)}</td>
//                       <td title={d.aisle}>{truncateText(d.aisle, 15)}</td>
//                       <td title={d.rack}>{truncateText(d.rack, 15)}</td>
//                       <td title={d.level}>{truncateText(d.level, 10)}</td>
//                       <td>{d.capacity}</td>
//                       <td>
//                         <button className='link-p' onClick={() => handleLocationDetailsClick(d)}>
//                           <FontAwesomeIcon icon={faEye} />
//                         </button>
//                         <button className='link-p' onClick={() => handleEditLocationClick(d)}>
//                           <FontAwesomeIcon icon={faPenToSquare} />
//                         </button>
//                         <button className='link-p' onClick={() => handleDeleteLocation(d.id)}>
//                           <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                       </td>
//                     </tr>
    
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {isAddLocationOpen && (
//             <div className='modal'>
//               <div className='modal-content'>
//                 <span className='close' onClick={() => setAddLocationOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//                 <AddLocation onSuccess={handleAddLocationSuccess} />
//               </div>
//             </div>
//           )}
//           {isEditLocationOpen && (
//             <div className='modal'>
//               <div className='modal-content'>
//                 <span className='close' onClick={() => setEditLocationOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//                 <EditLocation location={selectedLocation} onSuccess={handleEditLocationSuccess} />
//               </div>
//             </div>
//           )}
//           {isLocationDetailsOpen && (
//             <div className='modal'>
//               <div className='modal-content'>
//                 <span className='close' onClick={() => setLocationDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//                 <LocationDetails locationId={selectedLocation.id} onClose={() => setLocationDetailsOpen(false)} />
//               </div>
//             </div>
//           )}
//         </div>
//       );
// }

// export default Locations;






