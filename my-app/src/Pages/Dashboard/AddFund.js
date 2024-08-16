import React, { useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { User } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

function AddFund({ customer, onSuccess }) {
    const [amount, setAmount] = useState('');
    const [username, setUserName] = useState('');
    const context = useContext(User);
    const token = context.auth.token;
    const navigate = useNavigate();

    useEffect(() => {
        if (customer) {
        
            setUserName(customer.username);
          
        }
      }, [customer]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            username: username,
            amount: parseFloat(amount),
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/wallets/add-funds/', payload, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            console.log('Fund added successfully:', response.data);
            if (onSuccess) onSuccess();
            navigate('/home'); 
        } catch (error) {
            if (error.response){
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error('Error message:', error.message);
            }
          }
    };

    return (
        <div className='userDetails'>
            <form   onSubmit={handleSubmit} className='form'>
                <div className='inputBox'>
                    <label className='labelOne'>Customer:</label>
                    <input  type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className='inputBox'>
                    <label className='labelOne'>Amount:</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='amount' />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button  style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none', width:'100px',marginTop:'15px'}} type='submit'>Save</button>
                </div>
            </form>
        </div>
    );
}

export default AddFund;





// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { User } from '../Context/UserContext';
// import { useNavigate } from 'react-router-dom';

// function AddFund({ customer, onSuccess }) {
//     const [amount, setAmount] = useState('');
//     const [username, setUsername] = useState('');
//     const context = useContext(User);
//     const token = context.auth.token;
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const payload = {
//             username: username,
//             amount: parseFloat(amount),
//         };

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/wallets/add-fund/', payload, {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             console.log('Fund added successfully:', response.data);
//             if (onSuccess) onSuccess();
//             navigate('/wallet'); // Navigate to wallet page after success
//         } catch (error) {
//             if (error.response) {
//                 console.error('Error response data:', error.response.data);
//                 console.error('Error response status:', error.response.status);
//                 alert(`Error: ${error.response.data.detail}`);
//             } else {
//                 console.error('Error message:', error.message);
//             }
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Customer:</label>
//                     <input type="text" value={customer.username} onChange={(e) => setUsername(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Amount:</label>
//                     <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//                 </div>
//                 <button type="submit">Add Fund</button>
//             </form>
//         </div>
//     );
// }

// export default AddFund;

// هي بقلب الكاتش
// if (error.response) {
//     console.error('Error response data:', error.response.data);
//     console.error('Error response status:', error.response.status);
//     alert(`Error: ${error.response.data.detail}`);
// } else {
//     console.error('Error message:', error.message);
// }