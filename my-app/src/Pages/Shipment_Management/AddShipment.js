// // import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import { useContext, useState } from 'react';

// function AddShipments({ onSuccess }) {
//   const [supplier, setSupplier] = useState('');
//   const [arrivalDate, setArrivalDate] = useState('');
//   const [details, setDetails] = useState([{ product: '', priceAtShipment: '', quantity: '' }]);
//   const context = useContext(User);
//   const token = context.auth.token;
//   const navigate = useNavigate();

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

//     console.log('Payload:', payload);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/shipments/create/', payload, {
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'Bearer ' + token,
//         }
//       });
//       console.log('Shipment created successfully:', response.data);
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
//         <button type="submit">Create Shipment</button>
//       </form>
//     </div>
//   );
// }

// export default AddShipments;


import React, { useContext, useState } from 'react';
import axios from 'axios';
import { User } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

function AddShipments({ onSuccess }) {
  const [supplier, setSupplier] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [details, setDetails] = useState([{ product: '', priceAtShipment: '', quantity: '' }]);
  // const [accept, setAccept] = useState(false);
  const context = useContext(User);
  const token = context.auth.token;
  const navigate = useNavigate();

  const handleInputChange = (index, event) => {
    const values = [...details];
    values[index][event.target.name] = event.target.value;
    setDetails(values);
  };

  const handleAddDetail = () => {
    setDetails([...details, { product: '', priceAtShipment: '', quantity: '' }]);
  };

  const handleRemoveDetail = (index) => {
    const values = [...details];
    values.splice(index, 1);
    setDetails(values);
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
        quantity: parseInt(detail.quantity)
      }))
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/shipments/create/', payload, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });
      console.log('Shipment created successfully:', response.data);
      if (onSuccess) onSuccess(); // قم باستدعاء onSuccess إذا تم تمريره كـ prop
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
          <label htmlFor="supplier"  className='labelOne'>Supplier:</label>
          <input id="supplier" type="number" value={supplier} onChange={(e) => setSupplier(e.target.value)} placeholder='Supplier'/>
        </div>
        <div  className='inputBox'>
          <label htmlFor="arrivalDate" className='labelOne'>Arrival Date:</label>
          <input id='arrivalDate' type="text" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} placeholder='Arrival Date' />
        </div>
        {details.map((detail, index) => (
          <div  className='inputBox' key={index}>
            <label htmlFor='product' className='labelOne'>Product:</label>
            <input
              id='product'
              type="number"
              name="product"
              value={detail.product}
              onChange={(e) => handleInputChange(index, e)}
              placeholder='Product'
            />
            <label htmlFor='priceAtShipment' className='labelOne'>Price at Shipment:</label>
            <input
              id='priceAtShipment'
              type="number"
              name="priceAtShipment"
              value={detail.priceAtShipment}
              onChange={(e) => handleInputChange(index, e)}
              placeholder='Price '
            />
            <label htmlFor='quantity' className='labelOne'>Quantity:</label>
            <input
              id='quantity'
              type="number"
              name="quantity"
              value={detail.quantity}
              onChange={(e) => handleInputChange(index, e)}
              placeholder='quantity'
            />
            {/* {detail.quantity <= 0 && accept && <p className='error'>Number must be greater!</p>} */}
            <button type="button" onClick={() => handleRemoveDetail(index)}
            style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'100px' , margin:'10px'}}>Remove</button>
          </div>
        ))}
        <div style={{ display:'flex' , justifyContent:'space-between', alignItems:'center',}}>
        <button 
        style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'200px' , margin:'10px'}}
        type="button" onClick={handleAddDetail}>Add Detail</button>
        <button
        style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'200px' , margin:'10px'}}
        type="submit">Create Shipment</button>
        </div>
      </form>
    </div>
  );
}

export default AddShipments;

