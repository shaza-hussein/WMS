import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Style.css';
import { User } from '../Context/UserContext';

function AddStaff({ onSuccess }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [warehouse_id, setWarehouseId] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();
  const context = useContext(User);
  const token = context.auth.token;

  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;

    if (first_name.length < 1 || last_name.length < 1 || username.length < 1 || password.length < 8 || confirm_password !== password) {
      flag = false;
    } else {
      flag = true;
    }

    try {
      if (flag) {
        let response = await axios.post('http://127.0.0.1:8000/api/admin/register-staff/', {
          first_name: first_name,
          last_name: last_name,
          username: username,
          email: email,
          password: password,
          confirm_password: confirm_password,
          role: "staff",
          warehouse_id: warehouse_id,
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
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login'); 
      } else {
        setEmailError(err.response.status);
      }
    }
  }

  return (
    <div className='parent'>
      <div className='register'>
        <form onSubmit={submit} className='form'>
          <div className='tow'>
            <label htmlFor="first_name">First Name:</label><br />
            <input id="first_name" type="text" placeholder="First Name..." value={first_name} onChange={(e) => setFirstName(e.target.value)} />
            {first_name.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
            <label htmlFor="last_name">Last Name:</label><br />
            <input id="last_name" type="text" placeholder="Last Name..." value={last_name} onChange={(e) => setLastName(e.target.value)} />
            {last_name.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div>
            <label htmlFor="username">Username:</label><br />
            <input id="username" type="text" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
            {username.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
            <label htmlFor="email">Email:</label><br />
            <input id="email" type="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError === 400 && accept && <p className='error'>This email already exists.</p>}
          </div>
          <div >
            <label htmlFor="password">Password:</label><br />
            <input id="password" type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            {password.length < 8 && accept && <p className='error'> Password must be more than 8 characters</p>}
            <label htmlFor="confirm_password">Confirm Password:</label><br />
            <input id="confirm_password" type="password" placeholder="Confirm Password..." value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
            {confirm_password !== password && accept && <p className='error'>Password does not match</p>}
            <label htmlFor="warehouse_id">Warehouse-Id:</label><br />
            <input id="warehouse_id" type="number" placeholder="warehouse_id..." value={warehouse_id} onChange={(e) => setWarehouseId(e.target.value)} />
            {warehouse_id.length < 0 && accept && <p className='error'>Fill This Field, Please!</p>}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type='submit'>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStaff;
