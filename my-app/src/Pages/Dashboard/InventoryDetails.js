import React, { useContext, useEffect, useState } from 'react';
import { User } from '../Context/UserContext';
import axios from 'axios';
//  import './Product.css'; // أضف الأنماط المناسبة
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function InventoryDetails({ inventoryId, onClose }) {
    const context = useContext(User);
    const token = context.auth.token;
    const [inventory, setInventory] = useState(null);
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/inventory/${inventoryId}/`, {
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
            console.error("Error fetching product details:", error);
          }
        }
      };
  
      fetchProductDetails();
    }, [inventoryId, token]);
  
    if (!inventory) {
      return <p>Loading...</p>;
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + '...';
        }
        return text;
      };
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}><FontAwesomeIcon icon={faTimes} /></span>
        <div >
        {/* <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Inventory Id: </strong>{inventory.id}</p> */}
        
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }} title={inventory.product.name}><strong style={{ color:' #00457c' }}>Product Name:</strong><br/> {truncateText(inventory.product.name, 45)}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }} title={inventory.product.description}><strong style={{ color:' #00457c' }}>Product Description:</strong> <br/> {truncateText(inventory.product.description, 45)}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Product Price : </strong> {inventory.product.price}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Product Category : </strong> {inventory.product.category}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Product Supplier : </strong> {inventory.product.supplier}</p>

        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Location Name : </strong> {inventory.location.name}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>aisle : </strong> {inventory.location.aisle}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>rack : </strong> {inventory.location.rack}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>level : </strong> {inventory.location.level}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>capacity : </strong> {inventory.location.capacity}</p>

        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>quantity : </strong> {inventory.quantity}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }} title={inventory.expiry_date}><strong style={{ color:' #00457c' }}>expiry_date:</strong> {inventory.expiry_date ? inventory.expiry_date : 'usable'}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>status : </strong> {inventory.status}</p>
        </div>
        
      </div>
    </div>
  )
}

export default InventoryDetails