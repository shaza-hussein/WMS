import React, { useCallback, useContext, useEffect, useState } from 'react';
import SideMenu from '../../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faTimes, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { User } from '../Context/UserContext';
import AddSupplier from './AddSupplier';
import EditSupplier from './EditSupplier';
import SupplierDetails from './SupplierDetails';
import '../Products_Management/Product.css'

export default function Supplier() {
  const context = useContext(User);
  const token = context.auth.token;

  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
  const [isAddSupplierOpen, setAddSupplierOpen] = useState(false);
  const [isEditSupplierOpen, setEditSupplierOpen] = useState(false);
  const [isSupplierDetailsOpen, setSupplierDetailsOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const fetchSupplierData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/suppliers/', {
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
        console.error("Error fetching supplier data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchSupplierData();
  }, [fetchSupplierData]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const handleAddSupplierSuccess = () => {
    setAddSupplierOpen(false);
    fetchSupplierData(); // Refresh the data after adding a new supplier
  };

  const handleEditSupplierSuccess = () => {
    setEditSupplierOpen(false);
    fetchSupplierData(); // Refresh the data after editing a supplier
  };

  const handleDeleteSupplier = async (id) => {
    const conf = window.confirm('Do you want to delete this supplier?');
    if (conf) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}/delete/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        fetchSupplierData(); // Refresh the data after deleting a supplier
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error deleting supplier:", error);
        }
      }
    }
  };

  const handleEditSupplierClick = (supplier) => {
    setSelectedSupplier(supplier);
    setEditSupplierOpen(true);
  };

  const handleSupplierDetailsClick = (supplier) => {
    setSelectedSupplier(supplier);
    setSupplierDetailsOpen(true);
  };

  const filteredRecords = records.filter(record => {
    return record.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <div className='table'>
        <div className='table-header'>
          <h4>Supplier Details</h4>
          <div style={{ display: 'flex' }}>
            <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
              <label>
                <input 
                  type='text' 
                  placeholder='search by company...' 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} // تحديث حالة البحث
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
              </label>
            </div>
            <button 
              className='link-p' 
              style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff', marginLeft: '10px' }} 
              onClick={() => setAddSupplierOpen(true)}
            >
              + Add New Supplier
            </button>
          </div>
        </div>
        <div className='table-section'>
          <table className='fixed'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((d, i) => (
                <tr key={i}>
                  <td className='tdTableOne' title={d.id}>{truncateText(d.id, 10)}</td>
                  <td className='tdTableOne' title={d.name}>{truncateText(d.name, 10)}</td>
                  <td className='tdTableOne' title={d.contact_person}>{truncateText(d.contact_person, 10)}</td>
                  <td className='tdTableOne' title={d.email}>{truncateText(d.email, 15)}</td>
                  <td className='tdTableOne'>{d.phone}</td>
                  <td className='tdTableOne'>
                    <button className='link-p' onClick={() => handleSupplierDetailsClick(d)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className='link-p' onClick={() => handleEditSupplierClick(d)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button  className='link-p' onClick={() => handleDeleteSupplier(d.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddSupplierOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setAddSupplierOpen(false)}> <FontAwesomeIcon icon={faTimes} /></span>
            <AddSupplier onSuccess={handleAddSupplierSuccess} />
          </div>
        </div>
      )}
      {isEditSupplierOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setEditSupplierOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <EditSupplier supplier={selectedSupplier} onSuccess={handleEditSupplierSuccess} />
          </div>
        </div>
      )}
      {isSupplierDetailsOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setSupplierDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <SupplierDetails supplierId={selectedSupplier.id} onClose={() => setSupplierDetailsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}



// // import React, { useCallback, useContext, useEffect, useState } from 'react';
// import SideMenu from '../../components/SideMenu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPenToSquare, faTrash, faTimes,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import { useCallback, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import AddSupplier from './AddSupplier';
// import EditSupplier from './EditSupplier';
// import SupplierDetails from './SupplierDetails';
// import './Supplier.css';




// export default function Supplier() {

// const context = useContext(User);
// const token = context.auth.token;

// const [records, setRecords] = useState([]);
// const [isAddSupplierOpen, setAddSupplierOpen] = useState(false);
// const [isEditSupplierOpen, setEditSupplierOpen] = useState(false);
// const [isSupplierDetailsOpen, setSupplierDetailsOpen] = useState(false);
// const [selectedSupplier, setSelectedSupplier] = useState(null);

// const fetchSupplierData = useCallback(async () => {
//     try {
//         const response = await axios.get('http://127.0.0.1:8000/api/suppliers/', {
//         headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//         },
//         });
//         setRecords(response.data);
//     } catch (error) {
//         if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//         } else {
//         console.error("Error fetching product data:", error);
//         }
//     }
//     }, [token]);

//     useEffect(() => {
//     fetchSupplierData();
//     }, [fetchSupplierData]);

// const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//         return text.slice(0, maxLength) + '...';
//     }
//     return text;
//     };

// const handleAddSupplierSuccess = () => {
//     setAddSupplierOpen(false);
//     fetchSupplierData(); // Refresh the data after adding a new product
//     };

// const handleEditSupplierSuccess = () => {
//     setEditSupplierOpen(false);
//     fetchSupplierData(); // Refresh the data after editing a product
//     };

// const handleDeleteSupplier = async (id) => {
//     const conf = window.confirm('Do you want to delete this product?');
//     if (conf) {
//         try {
//         await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}/delete/`, {
//         headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//         },
//         });
//         fetchSupplierData(); // Refresh the data after deleting a product
//         } catch (error) {
//         if (error.response && error.response.status === 401) {
//             window.location.href = '/login';
//         } else {
//             console.error("Error deleting supplier:", error);
//         }
//         }
//     }
//     };

// const handleEditSupplierClick = (supplier) => {
//     setSelectedSupplier(supplier);
//     setEditSupplierOpen(true);
//     };

// const handleSupplierDetailsClick = (supplier) => {
//     setSelectedSupplier(supplier);
//     setSupplierDetailsOpen(true);
//     };

//     return (
//     <div style={{ display: "flex" }}>
//         <SideMenu />
//         <div className='table'>
//         <div className='table-header'>
//             <p>Supplier Details</p>
//             <div style={{ display: 'flex' }}>
//             <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
//                 <label>
//                     <input type='text' placeholder='search here ...'/>
//                     <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
//                 </label>
//             </div>
//             <button 
//             className='link-p' 
//             style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff' }} 
//             onClick={() => setAddSupplierOpen(true)}
//             >
//             + Add New Supplier
//             </button>
//         </div>
//         </div>
//         <div className='table-section'>
//         <table>
//             <thead>
//                 <tr>
//                 <th>ID</th>
//                 <th>Company</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {records.map((d, i) => (
//                 <tr key={i}>
//                     <td title={d.id}>{truncateText(d.id, 10)}</td>
//                     <td title={d.name}>{truncateText(d.name, 10)}</td>
//                     <td title={d.contact_person}>{truncateText(d.contact_person, 10)}</td>
//                     <td title={d.email}>{truncateText(d.email, 15)}</td>
//                     <td>{d.phone}</td>
//                     <td>
//                     <button className='link-p' onClick={() => handleSupplierDetailsClick(d)}>
//                         <FontAwesomeIcon icon={faEye} />
//                     </button>
//                     <button className='link-p' onClick={() => handleEditSupplierClick(d)}>
//                         <FontAwesomeIcon icon={faPenToSquare} />
//                     </button>
//                     <button onClick={() => handleDeleteSupplier(d.id)}>
//                         <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                     </td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//         </div>
//     </div>
//         {isAddSupplierOpen && (
//         <div className='modal'>
//             <div className='modal-content'>
//             <span className='close' onClick={() => setAddSupplierOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <AddSupplier onSuccess={handleAddSupplierSuccess} />
//             </div>
//         </div>
//         )}
//         {isEditSupplierOpen && (
//         <div className='modal'>
//             <div className='modal-content'>
//             <span className='close' onClick={() => setEditSupplierOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <EditSupplier supplier={selectedSupplier} onSuccess={handleEditSupplierSuccess} />
//             </div>
//         </div>
//         )}
//         {isSupplierDetailsOpen && (
//         <div className='modal'>
//             <div className='modal-content'>
//             <span className='close' onClick={() => setSupplierDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <SupplierDetails supplierId={selectedSupplier.id} onClose={() => setSupplierDetailsOpen(false)} />
//             </div>
//         </div>
//         )}
//     </div>
//     );
// }


