import { User } from '../Context/UserContext';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import InventoryDetails from './InventoryDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function SeeInventory() {
  const [inventory, setInventory] = useState([]);
  const [isInventoryDetailsOpen, setInventoryDetailsOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [viewAll, setViewAll] = useState(false); // New state for managing "View All"
  const context = useContext(User);
  const token = context.auth.token;

  const fetchInventoryData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/inventory/', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setInventory(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error("Error fetching inventory data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const handleInventoryDetailsClick = (inventory) => {
    setSelectedInventory(inventory);
    setInventoryDetailsOpen(true);
  };

  const handleViewAll = () => {
    setViewAll(true);
  };

  return (
    <>
      <div className='cardHeader'>
        <p>Inventory</p>
        <button onClick={handleViewAll}  style={{padding:'8px 15px', color: '#fff', border: 'none', background: '#0079c1', cursor: 'pointer',height:'40px',borderRadius:'20px' }}>
          View All
        </button>
      </div>
      <div>
        <table className='customerTable'>
          <thead className='tHead'>
            <tr>
              <td className='customerTd'>Product</td>
              <td className='customerTd'>Price</td>
              <td className='customerTd'>Location</td>
              <td className='customerTd'>Quantity</td>
              <td className='customerTd'>Expiry_date</td>
              <td className='customerTd'>Status</td>
              <td className='customerTd'>Action</td>
            </tr>
          </thead>
          <tbody>
            {inventory.slice(0, viewAll ? inventory.length : 4).map((d, i) => (
              <tr key={i}>
                <td title={d.product.name}>{truncateText(d.product.name, 10)}</td>
                <td title={d.product.price}>{truncateText(d.product.price, 10)}</td>
                <td title={d.location.name}>{truncateText(d.location.name, 10)}</td>
                <td title={d.quantity}>{truncateText(d.quantity, 10)}</td>
                <td title={d.expiry_date}>{d.expiry_date ? d.expiry_date : 'usable'}</td>
                <td>{d.status}</td>
                <td>
                  <button className='link-p' onClick={() => handleInventoryDetailsClick(d)}>
                    More Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isInventoryDetailsOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={() => setInventoryDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
              <InventoryDetails inventoryId={selectedInventory.id} onClose={() => setInventoryDetailsOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SeeInventory;








// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import InventoryDetails from './InventoryDetails';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes,faBoxesStacked } from '@fortawesome/free-solid-svg-icons';


// function SeeInventory() {

//   const [inventory, setInventory] = useState([]);
//   const context = useContext(User);
//   const token = context.auth.token;


//   const [isInventoryDetailsOpen, setInventoryDetailsOpen] = useState(false);
//   const [selectedInventory, setSelectedInventory] = useState(null);

//   const fetchInventoryData = useCallback(async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/inventory/', {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         setInventory(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login';
//         } else {
//           console.error("Error fetching inventory data:", error);
//         }
//       }
//     }, [token]);
  
//     useEffect(() => {
//       fetchInventoryData();
//     }, [fetchInventoryData]);


//   const truncateText = (text, maxLength) => {
//       if (text.length > maxLength) {
//         return text.slice(0, maxLength) + '...';
//       }
//       return text;
//     };

//     const handleInventoryDetailsClick = (inventory) => {
//       setSelectedInventory(inventory);
//       setInventoryDetailsOpen(true);
//     };
//   return (
//     <>
//     <div className='cardHeader'>
//       <p>Inventory</p>
//       <FontAwesomeIcon icon={faBoxesStacked} style={{ fontSize:'25px' ,color:'#0079c1'}} />
//     </div>
//     <div  >
//           <table  className='customerTable'>
//             <thead className='tHead'>
//               <tr>
//                 <td className='customerTd'>Product</td>
//                 <td className='customerTd'>Price</td>
//                 <td className='customerTd'>Location</td>
//                 <td className='customerTd'> Quantity</td>
//                 <td className='customerTd'>Expiry_date</td>
//                 <td className='customerTd'>Status</td>
//                 <td className='customerTd'>Action</td>
//               </tr>
//             </thead>
//             <tbody>
//               {inventory.map((d, i) => (
//                 <tr key={i}>
//                   <td title={d.product.name}>{truncateText(d.product.name, 10)}</td>
//                   <td title={d.product.price}>{truncateText(d.product.price, 10)}</td>
//                   <td title={d.location.name}>{truncateText(d.location.name, 10)}</td>
//                   <td title={d.quantity}>{truncateText(d.quantity, 10)}</td>
//                   <td title={d.expiry_date}>{d.expiry_date ? d.expiry_date : 'usable'}</td>
//                   <td >{d.status}</td>
//                   <td>
//                   <button className='link-p' onClick={() => handleInventoryDetailsClick(d)}>
//                       More Details
//                     </button>
//                   </td>
//                 </tr>

//               ))}
//             </tbody>
//           </table>
//           {isInventoryDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setInventoryDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <InventoryDetails inventoryId={selectedInventory.id} onClose={() => setInventoryDetailsOpen(false)} />
//           </div>
//         </div>
//       )}
//         </div>
//         </>
//   );

  
// }

// export default SeeInventory;