import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../Context/UserContext';
import axios from 'axios';

function AddProduct({ onSuccess }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [accept, setAccept] = useState(false);

  const navigate = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;

    if (name.length < 1 || description.length < 1 || price.length < 1) {
      flag = false;
    } else {
      flag = true;
    }

    try {
      if (flag) {
        let response = await axios.post('http://127.0.0.1:8000/api/products/create/', {
          name: name,
          description: description,
          category: category,
          supplier: supplier,
          size: size,
          price: price,
          barcode: barcode,
        }, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if (response.status === 201) {
          onSuccess();
        }
      }
    }  catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.error("Error adding product:", error);
      }
    }
  }
  return (
    <div className='parent'>
      <div className='userDetails'>
        <form onSubmit={submit} className='form'>
        <div className='inputBox' >
            <label htmlFor="name" className='labelOne'>Product Name:</label>
            <input id="name" type="text" placeholder="Product Name..." value={name} onChange={(e) => setName(e.target.value)} />
            {name.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
            
          </div>
          <div className='inputBox'>
            <label htmlFor="description" className='labelOne'>Description:</label>
            <input id="description" type="text" placeholder="description..." value={description} onChange={(e) => setDescription(e.target.value)} />
            {description.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div className='inputBox'>
            <label htmlFor="category" className='labelOne'>Category:</label>
            <input id="category" type="number" placeholder="category..." value={category} onChange={(e) => setCategory(e.target.value)} />
            
          </div>
          <div className='inputBox'>
            <label htmlFor="supplier" className='labelOne'>Supplier:</label>
            <input id="supplier" type="number" placeholder="supplier..." required value={supplier} onChange={(e) => setSupplier(e.target.value)} />
          </div>
          <div className='inputBox' >
            <label htmlFor="size" className='labelOne'>Size:</label>
            <input id="size" type="number" placeholder="size..." required value={size} onChange={(e) => setSize(e.target.value)} />
            
          </div>
          <div className='inputBox'>
          <label htmlFor="price" className='labelOne'>Price:</label>
            <input id="price" type="number" placeholder="Price..." required value={price} onChange={(e) => setPrice(e.target.value)} />
            {/* {price.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>} */}
          </div>
          <div className='inputBox'>
            <label htmlFor="barcode" className='labelOne'>Barcode:</label>
            <input id="barcode" type="number" placeholder="barcode..." required value={barcode} onChange={(e) => setBarcode(e.target.value)} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button  style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'100px',fontWeight:'bold'}}  type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddProduct;

