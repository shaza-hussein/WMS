// ProductDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { User } from '../Context/UserContext';
import axios from 'axios';
 import './Product.css'; // أضف الأنماط المناسبة
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ProductDetails({ productId, onClose }) {
  const context = useContext(User);
  const token = context.auth.token;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setProduct(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error fetching product details:", error);
        }
      }
    };

    fetchProductDetails();
  }, [productId, token]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className='modal'>
      <div className='modal-content'  >
        <span className='close' onClick={onClose}><FontAwesomeIcon icon={faTimes} /></span>
        <div >
        {/* <span style={{ width:'100%',height:'30px',backgroundColor:'rgb(240, 240, 240);' }}>Product Details</span> */}
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Product Name</strong><br/>{product.name}</p>
        <p style={{ letterSpacing:'0.5px',color:'#8493a5' }}><strong style={{ color:' #00457c' }}>Description</strong><br/> {product.description}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Category : </strong> {product.category.name}</p>
        <p style={{ letterSpacing:'0.5px',color:'#8493a5'}}><strong style={{ color:' #00457c' }}>Supplier : </strong> {product.supplier.name}</p>
        <p style={{ letterSpacing:'0.5px',color:'#8493a5'}}><strong style={{ color:' #00457c' }}>Contact Person : </strong>{product.supplier.contact_person}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5'}}><strong style={{ color:' #00457c' }}>Price : </strong> {product.price}</p>
        <p style={{ letterSpacing:'0.5px',color:'#8493a5' }}><strong style={{ color:' #00457c' }}>Size : </strong> {product.size}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5'}}><strong style={{ color:' #00457c' }}>Barcode : </strong>{product.barcode}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
