import axios from 'axios';
import React, {  useContext,  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User } from '../Context/UserContext';



function AddSupplier({ onSuccess }) {

  const [name, setName] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;


  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;

    if (name.length < 1 || contact_person.length < 1 ) {
      flag = false;
    } else {
      flag = true;
    }

    try {
      if (flag) {
        let response = await axios.post('http://127.0.0.1:8000/api/suppliers/create/', {
          name: name,
          contact_person: contact_person,
          email: email,
          phone: phone,
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
      } else if(error.response && error.response.status === 401) {
        setEmailError(error.response.status);
        
      }else{
        console.error("Error adding supplier:", error);
      }
    }
  }
  return (
    <div className='parent'>
      <div className='userDetails'>
        <form onSubmit={submit} className='form'>
          <div className='inputBox' >
            <label htmlFor="name" className='labelOne'>Company Name:</label>
            <input id="name" type="text" placeholder="Company Name..." value={name} onChange={(e) => setName(e.target.value)} />
            {name.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
            
          </div>
          <div className='inputBox'>
          <label htmlFor="contact_person" className='labelOne'>Supplier Name:</label>
            <input id="contact_person" type="text" placeholder="Supplier ..." value={contact_person} onChange={(e) => setContactPerson(e.target.value)} />
            {contact_person.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div className='inputBox'>
            <label htmlFor="email" className='labelOne'>Email:</label>
            <input id="email" type="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError === 400 && accept && <p className='error'>This email already exists.</p>}
            
          </div>
          <div className='inputBox'>
          <label htmlFor="phone" className='labelOne'>Phone Number:</label>
          <input id="phone" type="phone" placeholder="Phone..." required value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button  style={{ backgroundColor: '#0079c1', color: '#ffffff' ,outline:'none',border:'none',width:'100px',fontWeight:'bold'}} type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSupplier;