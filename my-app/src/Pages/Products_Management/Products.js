import React, { useCallback, useContext, useEffect, useState } from 'react';
import SideMenu from '../../components/SideMenu';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faTimes, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { User } from '../Context/UserContext';
import axios from 'axios';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductDetails from './ProductDetails';
import '../../Style.css';

function Products() {
  const context = useContext(User);
  const token = context.auth.token;
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث
  const [isAddProductOpen, setAddProductOpen] = useState(false);
  const [isEditProductOpen, setEditProductOpen] = useState(false);
  const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProductData = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products/', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setRecords(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else {
        console.error("Error fetching product data:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const handleAddProductSuccess = () => {
    setAddProductOpen(false);
    fetchProductData(); // Refresh the data after adding a new product
  };

  const handleEditProductSuccess = () => {
    setEditProductOpen(false);
    fetchProductData(); // Refresh the data after editing a product
  };
  

  const handleDeleteProduct = async (id) => {
    const conf = window.confirm('Do you want to delete this product?');
    if (conf) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${id}/delete/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        fetchProductData(); // Refresh the data after deleting a product
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error deleting product:", error);
        }
      }
    }
  };

  const handleEditProductClick = (product) => {
    setSelectedProduct(product);
    setEditProductOpen(true);
  };

  const handleProductDetailsClick = (product) => {
    setSelectedProduct(product);
    setProductDetailsOpen(true);
  };

  // تصفية السجلات بناءً على نص البحث
  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.supplier.name.toLowerCase().includes(searchLower) || // البحث في اسم المزود
      record.category.name.toLowerCase().includes(searchLower)   // البحث في تصنيف المنتج
    );
  });

  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <div className='table'>
        <div className='table-header'>
          <h4>Product Details</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className='home-search' style={{ backgroundColor: 'rgb(240, 240, 240)' }}>
              <label>
                <input 
                  type='text' 
                  placeholder='Search by category or company...' 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} // تحديث حالة البحث
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
              </label>
            </div>
            <button 
              className='link-p' 
              style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff', height: '45px', borderRadius: '10px', marginLeft: '10px' }} 
              onClick={() => setAddProductOpen(true)}
            >
              + Add New Product
            </button>
          </div>
        </div>
        <div className='table-section'>
          <table  className='fixed'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Company</th>
                <th>Supplier</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((d, i) => (
                <tr key={i}>
                  <td className='tdTableOne' title={d.name}>{truncateText(d.name, 15)}</td>
                  <td className='tdTableOne' title={d.category.name}>{truncateText(d.category.name, 15)}</td>
                  <td className='tdTableOne' title={d.supplier.name}>{truncateText(d.supplier.name, 15)}</td>
                  <td className='tdTableOne' title={d.supplier.contact_person}>{truncateText(d.supplier.contact_person, 10)}</td>
                  <td className='tdTableOne'>{d.price}</td>
                  <td className='tdTableOne'>
                    <button className='link-p' onClick={() => handleProductDetailsClick(d)}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className='link-p' onClick={() => handleEditProductClick(d)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className='link-p' onClick={() => handleDeleteProduct(d.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddProductOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setAddProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <AddProduct onSuccess={handleAddProductSuccess} />
          </div>
        </div>
      )}
      {isEditProductOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setEditProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <EditProduct product={selectedProduct} onSuccess={handleEditProductSuccess} />
          </div>
        </div>
      )}
      {isProductDetailsOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setProductDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
            <ProductDetails productId={selectedProduct.id} onClose={() => setProductDetailsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;










// import React, { useContext, useEffect, useState } from 'react'
// import SideMenu from '../components/SideMenu';
// import { Link } from 'react-router-dom';
// import './Product.css';
// // Import the FontAwesomeIcon component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// // Import the specific icons you need
// import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// // import { FontAwesomeIcon } from '@fotawesome/react-fontawesome';

// import { User } from './Context/UserContext';
// import axios from 'axios';

// function Products() {


//   const context = useContext(User);
//   const token = context.auth.token;
//   const [records,setRecords]= useState([]);

//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/products/', {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         console.log(response.data);
//         // setColumns(Object.keys(response.data));
//         setRecords(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login'; 
//         } else {
//           console.error("Error fetching staff data:", error);
//         }
//       }
//     };
  
//     fetchStaffData();
//   }, [token]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };
//   return (
//     <div style={{ display:"flex" }}>
//       <SideMenu/>
//       <div className='table'>
//         <div className='table-header'>
//           <p>products Details</p>
//           <div style={{ display:'flex' }}>
//             <input className='search' placeholder='type here '/>
//             <Link to='/addProduct' className=' link-p' style={{ width:'300px',backgroundColor:'#0079c1',color:'#ffffff'}}> + Add New Product</Link>
//           </div>
          
//         </div>
//         <div className='table-section'>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Company</th>
//                 <th>Supplier</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((d, i) => (
//                 <tr key={i}>
//                   <td title={d.name}>{truncateText(d.name, 15)}</td>
//                   <td title={d.category.name}>{truncateText(d.category.name, 15)}</td>
//                   <td title={d.supplier.name}>{truncateText(d.supplier.name, 15)}</td>
//                   <td title={d.supplier.contact_person}>{truncateText(d.supplier.contact_person, 10)}</td>
//                   <td>{d.price}</td>
//                   <td>
//                     <Link className='link-p' to='/details'>
//                       <FontAwesomeIcon icon={faEye} />
//                     </Link>
//                     <Link className='link-p' to='/editProduct'>
//                       <FontAwesomeIcon icon={faPenToSquare} />
//                     </Link>
//                     <button>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             {/* <tbody>
//             {
//                 records.map((d,i)=>(
//                   <tr key={i}>
//                     <td>{d.name}</td>
//                     <td>{d.category.name}</td>
//                     <td>{d.supplier.name}</td>
//                     <td>{d.supplier.contact_person}</td>
//                     <td>{d.price}</td>
//                     <td>
//                       <Link className='link' to="/details"  ><FontAwesomeIcon icon={faEye} /></Link>
//                       <Link  className='link' to="/editProduct"  ><FontAwesomeIcon icon={faPenToSquare} /></Link>
//                       <button  ><FontAwesomeIcon icon={faTrash} /></button>
//                     </td>
//                   </tr>
//                 ))
//               }
//             </tbody> */}
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Products;

// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import SideMenu from '../../components/SideMenu';
// // import { Link } from 'react-router-dom';
// import './Product.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPenToSquare, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import AddProduct from './AddProduct';
// import EditProduct from './EditProduct';
// import ProductDetails from './ProductDetails';

// function Products() {
//   const context = useContext(User);
//   const token = context.auth.token;
//   const [records, setRecords] = useState([]);
//   const [isAddProductOpen, setAddProductOpen] = useState(false);
//   const [isEditProductOpen, setEditProductOpen] = useState(false);
//   const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);

//   const fetchProductData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/products/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setRecords(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login'; 
//       } else {
//         console.error("Error fetching product data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchProductData();
//   }, [fetchProductData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleAddProductSuccess = () => {
//     setAddProductOpen(false);
//     fetchProductData(); // Refresh the data after adding a new product
//   };

//   const handleEditProductSuccess = () => {
//     setEditProductOpen(false);
//     fetchProductData(); // Refresh the data after editing a product
//   };

//   const handleDeleteProduct = async (id) => {
//     const conf = window.confirm('Do you want to delete this product?');
//     if (conf) {
//       try {
//         await axios.delete(`http://127.0.0.1:8000/api/products/${id}/delete/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         fetchProductData(); // Refresh the data after deleting a product
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login'; 
//         } else {
//           console.error("Error deleting product:", error);
//         }
//       }
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>Product Details</p>
//           <div style={{ display: 'flex' }}>
//             <input className='search' placeholder='Type here' />
//             <button 
//               className='link-p' 
//               style={{ width: '300px', backgroundColor: '#0079c1', color: '#ffffff' }} 
//               onClick={() => setAddProductOpen(true)}
//             >
//               + Add New Product
//             </button>
//           </div>
//         </div>
//         <div className='table-section'>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Company</th>
//                 <th>Supplier</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((d, i) => (
//                 <tr key={i}>
//                   <td title={d.name}>{truncateText(d.name, 15)}</td>
//                   <td title={d.category.name}>{truncateText(d.category.name, 15)}</td>
//                   <td title={d.supplier.name}>{truncateText(d.supplier.name, 15)}</td>
//                   <td title={d.supplier.contact_person}>{truncateText(d.supplier.contact_person, 10)}</td>
//                   <td>{d.price}</td>
//                   <td>
//                     <button className='link-p' onClick={() => setProductDetailsOpen(true)}>
//                       <FontAwesomeIcon icon={faEye} />
//                     </button>
//                     <button className='link-p' onClick={() => setEditProductOpen(true)}>
//                       <FontAwesomeIcon icon={faPenToSquare} />
//                     </button>
//                     <button onClick={() => handleDeleteProduct(d.id)}>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {isAddProductOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setAddProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <AddProduct onSuccess={handleAddProductSuccess}  />
//           </div>
//         </div>
//       )}
//       {isEditProductOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setEditProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <EditProduct onSuccess={handleEditProductSuccess} />
//           </div>
//         </div>
//       )}
//       {isProductDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setProductDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <ProductDetails />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;








// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import SideMenu from '../../components/SideMenu';
// // import { Link } from 'react-router-dom';
// import './Product.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPenToSquare, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import AddProduct from './AddProduct';
// import EditProduct from './EditProduct';
// import ProductDetails from './ProductDetails';

// function Products() {
//   const context = useContext(User);
//   const token = context.auth.token;
//   const [records, setRecords] = useState([]);
//   const [isAddProductOpen, setAddProductOpen] = useState(false);
//   const [isEditProductOpen, setEditProductOpen] = useState(false);
//   const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);


//   const fetchProductData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/products/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setRecords(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login'; 
//       } else {
//         console.error("Error fetching product data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchProductData();
//   }, [fetchProductData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleAddProductSuccess = () => {
//     setAddProductOpen(false);
//     fetchProductData(); // Refresh the data after adding a new product
//   };

//   const handleEditProductSuccess = () => {
//     setEditProductOpen(false);
//     fetchProductData(); // Refresh the data after editing a product
//   };

//   const handleDeleteProduct = async (id) => {
//     const conf = window.confirm('Do you want to delete this product?');
//     if (conf) {
//       try {
//         await axios.delete(`http://127.0.0.1:8000/api/products/${id}/delete/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         fetchProductData(); // Refresh the data after deleting a product
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login'; 
//         } else {
//           console.error("Error deleting product:", error);
//         }
//       }
//     }
//   };

//   const handleEditProductClick = (product) => {
//     setSelectedProduct(product);
//     setEditProductOpen(true);
//   };


//   // const handleProductDetailsClick = (id) => {
//   //   setSelectedProduct(id);
//   //   setProductDetailsOpen(true);
//   // };


//   return (
//     <div style={{ display: "flex" }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>Product Details</p>
//           <div style={{ display: 'flex' }}>
//             <input className='search' placeholder='Type here' />
//             <button 
//               className='link-p' 
//               style={{ width: '300px', backgroundColor: '#0079c1', color: '#ffffff' }} 
//               onClick={() => setAddProductOpen(true)}
//             >
//               + Add New Product
//             </button>
//           </div>
//         </div>
//         <div className='table-section'>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Company</th>
//                 <th>Supplier</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((d, i) => (
//                 <tr key={i}>
//                   <td title={d.name}>{truncateText(d.name, 15)}</td>
//                   <td title={d.category.name}>{truncateText(d.category.name, 15)}</td>
//                   <td title={d.supplier.name}>{truncateText(d.supplier.name, 15)}</td>
//                   <td title={d.supplier.contact_person}>{truncateText(d.supplier.contact_person, 10)}</td>
//                   <td>{d.price}</td>
//                   <td>
//                     <button className='link-p' onClick={() => setProductDetailsOpen(true)}>
//                       <FontAwesomeIcon icon={faEye} />
//                     </button>
//                     <button className='link-p' onClick={() => handleEditProductClick(d)}>
//                       <FontAwesomeIcon icon={faPenToSquare} />
//                     </button>
//                     <button onClick={() => handleDeleteProduct(d.id)}>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {isAddProductOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setAddProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <AddProduct onSuccess={handleAddProductSuccess} />
//           </div>
//         </div>
//       )}
//       {isEditProductOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setEditProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <EditProduct product={selectedProduct} onSuccess={handleEditProductSuccess} />
//           </div>
//         </div>
//       )}
//       {isProductDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setProductDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <ProductDetails product={selectedProduct} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;


// Products.js



// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import SideMenu from '../../components/SideMenu';
// import './Product.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faPenToSquare, faTrash, faTimes ,faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
// import { User } from '../Context/UserContext';
// import axios from 'axios';
// import AddProduct from './AddProduct';
// import EditProduct from './EditProduct';
// import ProductDetails from './ProductDetails';
// import '../../Style.css';
// function Products() {
//   const context = useContext(User);
//   const token = context.auth.token;
//   const [records, setRecords] = useState([]);
//   const [isAddProductOpen, setAddProductOpen] = useState(false);
//   const [isEditProductOpen, setEditProductOpen] = useState(false);
//   const [isProductDetailsOpen, setProductDetailsOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const fetchProductData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/products/', {
//         headers: {
//           Accept: "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       setRecords(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         window.location.href = '/login';
//       } else {
//         console.error("Error fetching product data:", error);
//       }
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchProductData();
//   }, [fetchProductData]);

//   const truncateText = (text, maxLength) => {
//     if (text.length > maxLength) {
//       return text.slice(0, maxLength) + '...';
//     }
//     return text;
//   };

//   const handleAddProductSuccess = () => {
//     setAddProductOpen(false);
//     fetchProductData(); // Refresh the data after adding a new product
//   };

//   const handleEditProductSuccess = () => {
//     setEditProductOpen(false);
//     fetchProductData(); // Refresh the data after editing a product
//   };

//   const handleDeleteProduct = async (id) => {
//     const conf = window.confirm('Do you want to delete this product?');
//     if (conf) {
//       try {
//         await axios.delete(`http://127.0.0.1:8000/api/products/${id}/delete/`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
//         fetchProductData(); // Refresh the data after deleting a product
//       } catch (error) {
//         if (error.response && error.response.status === 401) {
//           window.location.href = '/login';
//         } else {
//           console.error("Error deleting product:", error);
//         }
//       }
//     }
//   };

//   const handleEditProductClick = (product) => {
//     setSelectedProduct(product);
//     setEditProductOpen(true);
//   };

//   const handleProductDetailsClick = (product) => {
//     setSelectedProduct(product);
//     setProductDetailsOpen(true);
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <SideMenu />
//       <div className='table'>
//         <div className='table-header'>
//           <p>Product Details</p>
//           <div style={{ display: 'flex' }}>
//           <div className='home-search' style={{ backgroundColor:'rgb(240, 240, 240)' }}>
//                 <label>
//                   <input type='text' placeholder='search here ...'/>
//                   <FontAwesomeIcon icon={faMagnifyingGlass} className='fa'/>
//                 </label>
//               </div>
//             <button 
//               className='link-p' 
//               style={{ width: '200px', backgroundColor: '#0079c1', color: '#ffffff',height:'45px',borderRadius:'10px' }} 
//               onClick={() => setAddProductOpen(true)}
//             >
//               + Add New Product
//             </button>
//           </div>
//         </div>
//         <div className='table-section'>
//           <table >
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Company</th>
//                 <th>Supplier</th>
//                 <th>Price</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((d, i) => (
//                 <tr key={i}>
//                   <td title={d.name}>{truncateText(d.name, 15)}</td>
//                   <td title={d.category.name}>{truncateText(d.category.name, 15)}</td>
//                   <td title={d.supplier.name}>{truncateText(d.supplier.name, 15)}</td>
//                   <td title={d.supplier.contact_person}>{truncateText(d.supplier.contact_person, 10)}</td>
//                   <td>{d.price}</td>
//                   <td>
//                     <button className='link-p' onClick={() => handleProductDetailsClick(d)}>
//                       <FontAwesomeIcon icon={faEye} />
//                     </button>
//                     <button className='link-p' onClick={() => handleEditProductClick(d)}>
//                       <FontAwesomeIcon icon={faPenToSquare} />
//                     </button>
//                     <button className='link-p' onClick={() => handleDeleteProduct(d.id)}>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>

//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {isAddProductOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setAddProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <AddProduct onSuccess={handleAddProductSuccess} />
//           </div>
//         </div>
//       )}
//       {isEditProductOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setEditProductOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <EditProduct product={selectedProduct} onSuccess={handleEditProductSuccess} />
//           </div>
//         </div>
//       )}
//       {isProductDetailsOpen && (
//         <div className='modal'>
//           <div className='modal-content'>
//             <span className='close' onClick={() => setProductDetailsOpen(false)}><FontAwesomeIcon icon={faTimes} /></span>
//             <ProductDetails productId={selectedProduct.id} onClose={() => setProductDetailsOpen(false)} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;
