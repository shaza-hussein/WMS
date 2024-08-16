import React, { useContext, useState ,useEffect} from 'react'

import { User } from '../Context/UserContext';
import axios from 'axios';

function EditLocation({ location, onSuccess }) {
  const [id, setId] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [name, setName] = useState("");
  const [aisle, setAisle] = useState("");
  const [rack, setRack] = useState("");
  const [level, setLevel] = useState("");
  const [barcode, setBarcode] = useState("");
  const [capacity, setCapacity] = useState("");
  
  const [accept, setAccept] = useState(false);


  const context = useContext(User);
  const token = context.auth.token;

  
  useEffect(() => {
    if (location) {
       setId(location.id);
       setWarehouse(location.warehouse);
       setName(location.name);
       setAisle(location.aisle);
       setRack(location.rack);
       setLevel(location.level);
       setBarcode(location.barcode);
       setCapacity(location.capacity);
    }
  }, [location]);

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;

    if (name.length < 1 ) {
      flag = false;
    } else {
      flag = true;
    }

    try {
      if (flag) {
        let response = await axios.put(`http://127.0.0.1:8000/api/locations/update/${id}/`, {
          warehouse: warehouse,
          name: name,
          aisle: aisle,
          rack: rack,
          level: level,
          barcode: barcode,
          capacity: capacity,
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
        console.error("Error editing location:", error);
      }
    }
  }
  return (
    <div className='parent'>
      <div className='register'>
        <form onSubmit={submit} className='form'>
          <div className='tow'>
            <label htmlFor="warehouse">warehouse:</label>
            <input id="warehouse" type="number" placeholder="warehouse..." value={warehouse} onChange={(e) => setWarehouse(e.target.value)} />
            {warehouse === 0 && accept && <p className='error'>Fill This Field, Please!</p>}
            <label htmlFor="name">name:</label>
            <input id="name" type="text" placeholder="name..." value={name} onChange={(e) => setName(e.target.value)} />
            {name.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div>
            <label htmlFor="aisle">aisle:</label>
            <input id="aisle" type="number" placeholder="aisle..." value={aisle} onChange={(e) => setAisle(e.target.value)} />
            {aisle === 0 && accept && <p className='error'>Fill This Field, Please!</p>}
            <label htmlFor="rack">rack:</label>
            <input id="rack" type="number" placeholder="rack..." required value={rack} onChange={(e) => setRack(e.target.value)} />
            {rack === 0 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div >
            <label htmlFor="level">level:</label>
            <input id="level" type="number" placeholder="level..." value={level} onChange={(e) => setLevel(e.target.value)} />
            {level === 0 && accept && <p className='error'>Fill This Field, Please!</p>}
            <label htmlFor="barcode">Barcode:</label>
            <input id="barcode" type="number" placeholder="barcode..." value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            {barcode === 0 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div>
            <label htmlFor="capacity">capacity:</label>
            <input id="capacity" type="number" placeholder="capacity..." value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            {capacity === 0 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button  style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none'}} type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditLocation