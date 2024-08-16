// import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import { useNavigate } from 'react-router-dom';

// function EditShipment({ shipmentId, onSuccess }) {
//   const [supplier, setSupplier] = useState('');
//   const [arrivalDate, setArrivalDate] = useState('');
//   const [details, setDetails] = useState([{ product: '', priceAtShipment: '', quantity: '' }]);
//   const context = useContext(User);
//   const token = context.auth.token;
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the shipment data to populate the form
//     const fetchShipment = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/shipments/${shipmentId}/`, {
//           headers: {
//             Accept: 'application/json',
//             Authorization: 'Bearer ' + token,
//           },
//         });
//         const shipment = response.data;
//         setSupplier(shipment.supplier);
//         setArrivalDate(shipment.arrival_date);
//         setDetails(shipment.details.map(detail => ({
//           product: detail.product,
//           priceAtShipment: detail.price_at_shipment,
//           quantity: detail.quantity,
//         })));
//       } catch (error) {
//         console.error('Error fetching shipment:', error);
//       }
//     };
//     fetchShipment();
//   }, [shipmentId, token]);

//   const handleInputChange = (index, event) => {
//     const values = [...details];
//     values[index][event.target.name] = event.target.value;
//     setDetails(values);
//   };

//   const handleAddDetail = () => {
//     setDetails([...details, { product: '', priceAtShipment: '', quantity: '' }]);
//   };

//   const handleRemoveDetail = (index) => {
//     const values = [...details];
//     values.splice(index, 1);
//     setDetails(values);
//   };

//   const validateDateFormat = (dateString) => {
//     const regex = /^\d{4}-\d{2}-\d{2}$/;
//     return regex.test(dateString);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateDateFormat(arrivalDate)) {
//       alert('Date has wrong format. Use YYYY-MM-DD.');
//       return;
//     }

//     const payload = {
//       supplier: parseInt(supplier),
//       arrival_date: arrivalDate,
//       details: details.map(detail => ({
//         product: parseInt(detail.product),
//         price_at_shipment: parseFloat(detail.priceAtShipment),
//         quantity: parseInt(detail.quantity)
//       }))
//     };

//     try {
//       const response = await axios.put(`http://127.0.0.1:8000/api/shipments/update/${shipmentId}/`, payload, {
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'Bearer ' + token,
//         }
//       });
//       console.log('Shipment updated successfully:', response.data);
//       if (onSuccess) onSuccess(); // قم باستدعاء onSuccess إذا تم تمريره كـ prop
//     } catch (error) {
//       if (error.response) {
//         console.error('Error response data:', error.response.data);
//         console.error('Error response status:', error.response.status);
//         console.error('Error response headers:', error.response.headers);
//         if (error.response.status === 401) {
//           navigate('/login');
//         } else {
//           alert(`Error: ${error.response.data.supplier || error.response.data.arrival_date}`);
//         }
//       } else {
//         console.error('Error message:', error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Supplier:</label>
//           <input type="number" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
//         </div>
//         <div>
//           <label>Arrival Date:</label>
//           <input type="text" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
//         </div>
//         {details.map((detail, index) => (
//           <div key={index}>
//             <label>Product:</label>
//             <input
//               type="number"
//               name="product"
//               value={detail.product}
//               onChange={(e) => handleInputChange(index, e)}
//             />
//             <label>Price at Shipment:</label>
//             <input
//               type="number"
//               name="priceAtShipment"
//               value={detail.priceAtShipment}
//               onChange={(e) => handleInputChange(index, e)}
//             />
//             <label>Quantity:</label>
//             <input
//               type="number"
//               name="quantity"
//               value={detail.quantity}
//               onChange={(e) => handleInputChange(index, e)}
//             />
//             <button type="button" onClick={() => handleRemoveDetail(index)}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddDetail}>Add Detail</button>
//         <button type="submit">Update Shipment</button>
//       </form>
//     </div>
//   );
// }

// export default EditShipment;


import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

function EditShipment({ shipmentId, onSuccess, onClose }) {
  const [supplier, setSupplier] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [details, setDetails] = useState([{ product: '', priceAtShipment: '', quantity: '' }]);
  const context = useContext(User);
  const token = context.auth.token;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the shipment data to populate the form
    const fetchShipment = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/shipments/${shipmentId}/`, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        const shipment = response.data;

        // Ensure details is an array
        const shipmentDetails = Array.isArray(shipment.details) ? shipment.details : [];

        setSupplier(shipment.supplier || '');
        setArrivalDate(shipment.arrival_date || '');
        setDetails(shipmentDetails.map(detail => ({
          product: detail.product || '',
          priceAtShipment: detail.price_at_shipment || '',
          quantity: detail.quantity || '',
        })));
      } catch (error) {
        console.error('Error fetching shipment:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchShipment();
  }, [shipmentId, token, navigate]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDetails = details.map((detail, i) => (
      i === index ? { ...detail, [name]: value } : detail
    ));
    setDetails(updatedDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { product: '', priceAtShipment: '', quantity: '' }]);
  };

  const handleRemoveDetail = (index) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const validateDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateDateFormat(arrivalDate)) {
      alert('Date has wrong format. Use YYYY-MM-DD.');
      return;
    }

    const payload = {
      supplier: parseInt(supplier),
      arrival_date: arrivalDate,
      details: details.map(detail => ({
        product: parseInt(detail.product),
        price_at_shipment: parseFloat(detail.priceAtShipment),
        quantity: parseInt(detail.quantity),
      })),
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/shipments/update/${shipmentId}/`, payload, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });
      console.log('Shipment updated successfully:', response.data);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        if (error.response.status === 401) {
          navigate('/login');
        } else {
          alert(`Error: ${error.response.data.supplier || error.response.data.arrival_date}`);
        }
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <div className='userDetails'>
      <form onSubmit={handleSubmit} className='form'>
        <div  className='inputBox'>
          <label htmlFor='supplier' className='labelOne' >Supplier:</label>
          <input id='supplier' type="number" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
        </div>
        <div  className='inputBox'>
          <label htmlFor='arrivalDate' className='labelOne' >Arrival Date:</label>
          <input id='arrivalDate' type="text" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
        </div>
        {details.map((detail, index) => (
          <div key={index}  className='inputBox'>
            <label htmlFor='product' className='labelOne'>Product:</label>
            <input
              id='product'
              type="number"
              name="product"
              value={detail.product}
              onChange={(e) => handleInputChange(index, e)}
            />
            <label htmlFor='priceAtShipment' className='labelOne'>Price at Shipment:</label>
            <input
              id='priceAtShipment'
              type="number"
              name="priceAtShipment"
              value={detail.priceAtShipment}
              onChange={(e) => handleInputChange(index, e)}
            />
            <label htmlFor='quantity' className='labelOne'>Quantity:</label>
            <input
              id='quantity'
              type="number"
              name="quantity"
              value={detail.quantity}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button
            style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'100px' , margin:'10px'}}
            type="button" onClick={() => handleRemoveDetail(index)}>Remove</button>
          </div>
        ))}
        <div style={{ display:'flex' , justifyContent:'space-between', alignItems:'center',}}>
        <button
        style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'200px' , margin:'10px'}}
        type="button" onClick={handleAddDetail}>Add Detail</button>
        <button 
        style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'200px' , margin:'10px'}}
        type="submit">Update Shipment</button>
        </div>
      </form>
      
    </div>
  );
}

export default EditShipment;
