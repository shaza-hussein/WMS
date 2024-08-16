import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { User } from '../Context/UserContext';

function OrderDetails({ orderId }) {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orders/details/${orderId}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log(response.data); // طباعة البيانات لمعرفة شكلها
                setOrderDetails(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    window.location.href = '/login';
                } else {
                    console.error("Error fetching order data:", error);
                    setError('Error fetching order details');
                }
            }
        };

        fetchOrderDetails();
    }, [orderId, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!orderDetails) {
        return <div>No details available</div>;
    }

    return (
        <div className="shipment-details">

            <div >
                <div>
                    <div>
                    <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Customer:</strong> {orderDetails.customer ? orderDetails.customer.username : 'N/A'}</p>
                    <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Total Price:</strong> {orderDetails.total_price || 'N/A'}</p>

                    <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Create Date:</strong> {orderDetails.created_at || 'N/A'}</p>
                    <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Deliver Date:</strong> {orderDetails.delivered_at ? orderDetails.delivered_at : 'Not received yet'}</p>
                    <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Priority: </strong>{orderDetails.priority || 'N/A'}</p>
                    <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Status:</strong> {orderDetails.status || 'N/A'}</p>

                    {orderDetails.details.length > 0 ? (
                        orderDetails.details.map((detail) => (
                            <div key={detail.id} >
                                <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Product:</strong> {detail.product ? detail.product.name : 'N/A'}</p>
                                        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Product Price:</strong> {detail.product ? detail.product.price : 'N/A'}</p>
                                        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Sale Price:</strong> {detail.price_at_sale || 'N/A'}</p>
                                        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Quantity:</strong> {detail.quantity || 'N/A'}</p>
                                        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Status:</strong> {detail.status || 'N/A'}</p>
                                        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Order ID: </strong>{detail.order || 'N/A'}</p>
                            </div>
                        ))
                    ) : (
                        <div style={{ letterSpacing:'0.5px',color:' #a00' }}>No items available</div>
                    )}
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;

// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { User } from '../Context/UserContext';

// function OrderDetails({ orderId }) {
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const context = useContext(User);
//     const token = context.auth.token;

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/orders/details/${orderId}/`, {
//                     headers: {
//                         Authorization: "Bearer " + token,
//                     },
//                 });
//                 console.log(response.data); // طباعة البيانات لمعرفة شكلها
//                 setOrderDetails(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 if (error.response && error.response.status === 401) {
//                     window.location.href = '/login';
//                 } else {
//                     console.error("Error fetching order data:", error);
//                     setError('Error fetching order details');
//                 }
//             }
//         };

//         fetchOrderDetails();
//     }, [orderId, token]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className="shipment-details">
//             {orderDetails ? (
//                 <div>
//                     <h3>Order Details</h3>
//                     <div key={orderDetails.id} className="shipment-detail-card">
//                         <h5>Order Details</h5>
//                         <div className="product-info">
//                             <div className="product-details">
//                                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <p>Customer: {orderDetails.customer.username}</p>
//                                     <p>Total Price: {orderDetails.total_price}</p>
//                                 </div>
//                                 <p>Create Date: {orderDetails.created_at}</p>
//                                 <p>Deliver Date: {orderDetails.delivered_at ? orderDetails.delivered_at : 'Not received yet'}</p>
//                                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                                     <p>Priority: {orderDetails.priority}</p>
//                                     <p>Status: {orderDetails.status}</p>
//                                 </div>
//                                 <p>Product: {orderDetails.details.product.name}</p>
//                                 <p>Product Price: {orderDetails.details.product.price}</p>
//                                 <p>Sale Price: {orderDetails.details.price_at_sale}</p>
//                                 <p>Quantity: {orderDetails.details.quantity}</p>
//                                 <p>Status: {orderDetails.details.status}</p>
//                                 <p>Order: {orderDetails.details.order}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div>No details available</div>
//             )}
//         </div>
//     );
// }

// export default OrderDetails;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { User } from '../Context/UserContext';

// function OrderDetails({orderId}) {
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const context = useContext(User);
//     const token = context.auth.token;

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//           try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/orders/details/${orderId}/`,{
//                 headers: {
//                   Authorization: "Bearer " + token,
//                 },
//               });
//               setOrderDetails(response.data);
//               setLoading(false);
//           }catch (error) {
//             if (error.response && error.response.status === 401) {
//               window.location.href = '/login';
//             } else {
//               console.error("Error fetching order data:", error);
//               setError('Error fetching order details');
//             }
//           }
//         };
    
//         fetchOrderDetails();
//       }, [orderId,token]);
    
//       if (loading) return <div>Loading...</div>;
//       if (error) return <div>{error}</div>;
    
//   return (
//     <div className="shipment-details">
//       {orderDetails && orderDetails.length > 0 ? (
//         <div>
//           <h3>Order Details</h3>
//           {orderDetails.map((orderDetails) => (
//             <div key={orderDetails.id} className="shipment-detail-card">
//               <h5>Order Details</h5>
//               <div className="product-info">
//                 <div className="product-details">
//                 <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//                     <p>Customer: {orderDetails.customer.username}</p>
//                     <p>Total Price: {orderDetails.total_price}</p>
//                 </div>
//                 <p>Create Date: {orderDetails.created_at}</p>
//                 <p>Deliver Date: {orderDetails.delivered_at ? orderDetails.receive_date : 'Not received yet'}</p>
//                 <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//                 <p>Priority: {orderDetails.priority}</p>
//                 <p>Status: {orderDetails.status}</p>
//                 </div>
//                 <p>Product: {orderDetails.details.product.name}</p>
//                 <p>Product Price: {orderDetails.details.product.price}</p>
//                 <p> Sale Price: {orderDetails.details.price_at_sale}</p>
//                 <p> Quantity: {orderDetails.details.quantity}</p>
//                 <p> Status: {orderDetails.details.status}</p>
//                 <p> Order: {orderDetails.details.order}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>No details available</div>
//       )}
//     </div>
//   )
// }

// export default OrderDetails;