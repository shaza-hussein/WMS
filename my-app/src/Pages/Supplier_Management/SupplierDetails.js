import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { User } from '../Context/UserContext';
function SupplierDetails({ supplierId, onClose }) {


  
  const context = useContext(User);
  const token = context.auth.token;
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/suppliers/${supplierId}/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setSupplier(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error fetching product details:", error);
        }
      }
    };
    fetchSupplierDetails();
  }, [supplierId, token]);

  if (!supplier) {
    return <p>Loading...</p>;
  }
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}><FontAwesomeIcon icon={faTimes} /></span>
        {/* <h1>{supplier.id}</h1> */}
        <p  style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Company Name</strong><br/> {supplier.name}</p>
        <p  style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Supplier Name</strong><br/> {supplier.contact_person}</p>
        <p  style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Email</strong><br/> {supplier.email}</p>
        <p  style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Phone Number</strong><br/> {supplier.phone}</p>
        
        
      </div>
    </div>
  )
}

export default SupplierDetails;