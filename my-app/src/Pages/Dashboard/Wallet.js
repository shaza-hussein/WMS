
import { User } from '../Context/UserContext';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../../Style.css';
import AddFund from './AddFund';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Wallet() {
    const [wallet, setWallet] = useState([]);
    const [isAddFundOpen, setAddFundOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [viewAll, setViewAll] = useState(false); // New state for managing "View All"
    const context = useContext(User);
    const token = context.auth.token;

    const fetchWalletData = useCallback(async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/wallets/', {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            setWallet(response.data);
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.location.href = '/login';
            } else {
                console.error("Error fetching wallet data:", error);
            }
        }
    }, [token]);

    useEffect(() => {
        fetchWalletData();
    }, [fetchWalletData]);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const handleAddFundClick = (customer) => {
        setSelectedCustomer(customer);
        setAddFundOpen(true);
    };

    const handleAddFundSuccess = () => {
        setAddFundOpen(false);
        fetchWalletData();
    };

    const handleViewAll = () => {
        setViewAll(true);
    };

    return (
        <>
            <div className='cardHeader'>
                <p>Customer's Wallets</p>
                <button onClick={handleViewAll}  style={{padding:'8px 15px', color: '#fff', border: 'none', background: '#0079c1', cursor: 'pointer',height:'40px',borderRadius:'20px' }}>
                    View All
                </button>
            </div>
            <div className='card-container'>
                {wallet.slice(0, viewAll ? wallet.length : 4).map((d, i) => (
                    <div key={i} className='card'>
                        <div className='card-content'>
                            <p title={d.customer?.username} style={{ color: '#8493a5' }}>
                                <strong style={{ color: '#0079c1' }}>Customer Name</strong><br />
                                {truncateText(d.customer?.username || 'N/A', 15)}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <p style={{ color: '#8493a5' }}>
                                    <strong style={{ color: '#0079c1' }}>Balance</strong><br />
                                    {d.balance}
                                </p>
                                <button onClick={() => handleAddFundClick(d.customer)}>Add Fund</button>
                            </div>
                        </div>
                    </div>
                ))}

                {isAddFundOpen && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <span className='close' onClick={() => setAddFundOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            <AddFund customer={selectedCustomer} onSuccess={handleAddFundSuccess} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Wallet;













// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import '../../Style.css';
// import AddFund from './AddFund';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes , faWallet } from '@fortawesome/free-solid-svg-icons';

// function Wallet() {
//     const [wallet, setWallet] = useState([]);
//     const [isAddFundOpen, setAddFundOpen] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const context = useContext(User);
//     const token = context.auth.token;

//     const fetchWalletData = useCallback(async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/wallets/', {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             setWallet(response.data);
//             console.log(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 window.location.href = '/login';
//             } else {
//                 console.error("Error fetching wallet data:", error);
//             }
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchWalletData();
//     }, [fetchWalletData]);

//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//             return text.slice(0, maxLength) + '...';
//         }
//         return text;
//     };

//     const handleAddFundClick = (customer) => {
//         setSelectedCustomer(customer);
//         setAddFundOpen(true);
//     };

//     const handleAddFundSuccess = () => {
//         setAddFundOpen(false);
//         fetchWalletData();
//     };

//     return (
//         <>
//         <div className='cardHeader'>
//         <p > Customer's Wallets</p>
//         <FontAwesomeIcon icon={faWallet}   style={{ fontSize:'25px' ,color:'#0079c1'}}/>
        
//     </div>
//         <div className='card-container'>
//             {wallet.map((d, i) => (
//                 <div key={i} className='card'>
//                     <div className='card-content'>
//                         <p title={d.customer?.username} style={{ color:' #8493a5' }}><strong style={{ color:'#0079c1' }}>Customer Name</strong><br/>
//                             {truncateText(d.customer?.username || 'N/A', 15)}
//                         </p>
//                         <div style={{ display:'flex', alignItems:'center',justifyContent:'space-between' }}>
//                             <p style={{ color:' #8493a5' }}><strong style={{ color:' #0079c1' }} >Balance </strong><br/>{d.balance}</p>
//                             <button onClick={() => handleAddFundClick(d.customer)}>Add Fund</button>
//                         </div>
//                     </div>
//                 </div>
//             ))}

//             {isAddFundOpen && (
//                 <div className='modal'>
//                     <div className='modal-content'>
//                         <span className='close' onClick={() => setAddFundOpen(false)}>
//                             <FontAwesomeIcon icon={faTimes} />
//                         </span>
//                         <AddFund customer={selectedCustomer} onSuccess={handleAddFundSuccess} />
//                     </div>
//                 </div>
//             )}
//         </div>
//         </>
        
//     );
// }

// export default Wallet;

// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import '../../Style.css';

// function Wallet() {
//     const [wallet, setWallet] = useState([]);
//     const context = useContext(User);
//     const token = context.auth.token;
//     const fetchWalletData = useCallback(async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/wallets/', {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: "Bearer " + token,
//                 },
//             });
//             setWallet(response.data);
//             console.log(response.data);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 window.location.href = '/login';
//             } else {
//                 console.error("Error fetching wallet data:", error);
//             }
//         }
//     }, [token]);

//     useEffect(() => {
//         fetchWalletData();
//     }, [fetchWalletData]);

//     const truncateText = (text, maxLength) => {
//         if (text.length > maxLength) {
//             return text.slice(0, maxLength) + '...';
//         }
//         return text;
//     };


//     return (
//         // <div className='table-section'>
//         //     <table>
//         //         <thead>
//         //             <tr>
//         //                 <th>Customer-Name</th>
//         //                 <th>Balance</th>
//         //             </tr>
//         //         </thead>
//         //         <tbody>
//         //             {wallet.map((d, i) => (
//         //                 <tr key={i}>
//         //                     <td title={d.customer?.username}>
//         //                         {truncateText(d.customer?.username || 'N/A', 15)}
//         //                     </td>
//         //                     <td>{d.balance}</td>
//         //                 </tr>
//         //             ))}
//         //         </tbody>
//         //     </table>
//         // </div>
//         <div className='card-container'>
//             {wallet.map((d, i) => (
//                 <div key={i} className='card'>
//                     <div className='card-content'>
//                         <p title={d.customer?.username}>
//                             {truncateText(d.customer?.username || 'N/A', 15)}
//                         </p>
//                         <div style={{ display:'flex' }}>
//                         <p>{d.balance}</p>
                        
//                         <button >Add Fund</button>
//                         </div>
//                     </div>
//                 </div>
//             ))}

            
//         </div>
        
//     );
// }

// export default Wallet;




    // const handleAddAmount = async (customerId) => {
    //     const amountToAdd = prompt("Enter amount to add:");
    //     if (amountToAdd && !isNaN(amountToAdd)) {
    //         try {
    //             await axios.post('http://127.0.0.1:8000/api/wallets/add-funds/', {
    //                 customer_id: customerId,
    //                 amount: parseFloat(amountToAdd),
    //             }, {
    //                 headers: {
    //                     Accept: "application/json",
    //                     Authorization: "Bearer " + token,
    //                 },
    //             });
    //             alert("Amount added successfully!");
    //             fetchWalletData(); // Refresh the wallet data after adding funds
    //         } catch (error) {
    //             if (error.response && error.response.status === 401) {
    //                 window.location.href = '/login';
    //             } else {
    //                 console.error("Error adding product:", error);
    //             }
    //           }
    //     } else {
    //         alert("Invalid amount entered.");
    //     }
    // };
