import React, { useContext, useState, useEffect } from 'react';
import { User } from '../Context/UserContext';
import axios from 'axios';

function EditProduct({ product, onSuccess }) {
 const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    if (product) {
       setId(product.id);
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category.id);
      setSupplier(product.supplier.id);
      setSize(product.size);
      setPrice(product.price);
      setBarcode(product.barcode);
    }
  }, [product]);

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
        let response = await axios.put(`http://127.0.0.1:8000/api/products/${id}/update/`, {
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
        if (response.status === 200) {
          onSuccess();
        }
      }
    }  catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login'; 
      } else {
        console.error("Error editing product:", error);
      }
    }
  }

  return (
    <div className='parent'>
      <div className='userDetails'>
        <form onSubmit={submit} className='form'>
          <div className='inputBox'>
            {/* <label htmlFor="id">Product ID:</label>
            <input id="id" type="text" placeholder="Product ID..." value={id} onChange={(e) => setId(e.target.value)} disabled /> */}
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
            {category  <= 0 && accept && <p className='error'>Number must be greater!</p>}
          </div>
          <div className='inputBox'>
          <label htmlFor="supplier" className='labelOne'>Supplier:</label>
          <input id="supplier" type="number" placeholder="supplier..." required value={supplier} onChange={(e) => setSupplier(e.target.value)} />
          {supplier  <= 0 && accept && <p className='error'>Number must be greater!</p>}
          </div>
          <div className='inputBox' >
            <label htmlFor="size" className='labelOne'>Size:</label>
            <input id="size" type="number" placeholder="size..." value={size} onChange={(e) => setSize(e.target.value)} />
            {size  <= 0 && accept && <p className='error'>Number must be greater!</p>}
          </div>
          <div className='inputBox'>
            <label htmlFor="price" className='labelOne'>Price:</label>
            <input id="price" type="number" placeholder="Price..." value={price} onChange={(e) => setPrice(e.target.value)} />
            {price <= 0 && accept && <p className='error'>Number must be greater!</p>}
          </div>
          <div className='inputBox'>
            <label htmlFor="barcode" className='labelOne'>Barcode:</label>
            <input id="barcode" type="number" placeholder="barcode..." value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            {barcode <= 0 && accept && <p className='error'>Number must be greater!</p>}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button  style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'100px',fontWeight:'bold'}} type='submit'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;


