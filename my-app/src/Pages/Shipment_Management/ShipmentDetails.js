import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Shipment.css' ;// Ensure you have CSS for styling
import { User } from '../Context/UserContext';

function ShipmentDetails({ shipmentId }) {
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/shipments/details/${shipmentId}/`,{
            headers: {
              Authorization: "Bearer " + token,
            },
          });
        setShipmentDetails(response.data);
        setLoading(false);
      }catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error fetching shipment data:", error);
          setError('Error fetching shipment details');
        }
      }
    };

    fetchShipmentDetails();
  }, [shipmentId,token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="shipment-details">
      {shipmentDetails && shipmentDetails.length > 0 ? (
        <div>
          
          {shipmentDetails.map((detail) => (
            <div key={detail.id}>
              
                  <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Product Name</strong><br/> {detail.product.name}</p>
                  <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Description</strong><br/>  {detail.product.description}</p>
                  <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Size</strong><br/>  {detail.product.size}</p>
                  <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Price</strong><br/>  ${detail.product.price}</p>
                  <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Barcode</strong><br/>  {detail.product.barcode}</p>
              
              <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Price at Shipment</strong><br/>  ${detail.price_at_shipment}</p>
              <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Quantity</strong><br/>  {detail.quantity}</p>
              <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Status</strong><br/>  {detail.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No details available</div>
      )}
    </div>
  );
}

export default ShipmentDetails;
