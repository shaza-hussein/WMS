import '../../Style.css';
import { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';

export default function SingUp() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState("");
    
    const navigate = useNavigate();

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
                let response = await axios.post('http://127.0.0.1:8000/api/register/', {
                    first_name: first_name,
                    last_name: last_name,
                    username: username,
                    email: email,
                    password: password,
                    confirm_password: confirm_password,
                    role: "admin",
                });

                if (response.status === 201) {
                    navigate('/login');
                }
            }
        } catch (err) {
            setEmailError(err.response.status);
        }
    }

    return (
       <div className='bodyReg'>
         <div className="containerReg">

            <div className='title'>
                <p className='registration'>Registration</p>
            </div>
            <form onSubmit={submit}>
            <div className='userDetails'>
                <div className='inputBox'>
                    <label htmlFor="first_name" className='labelOne'>First Name:</label>
                    <input  className='inputOne' id="first_name" type="text" placeholder="First Name..." value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                    {first_name.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
                </div>
                <div className='inputBox'>
                    <label htmlFor="last_name" className='labelOne'>Last Name:</label>
                    <input className='inputOne' id="last_name" type="text" placeholder="Last Name..." value={last_name} onChange={(e) => setLastName(e.target.value)} />
                    {last_name.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
                </div>
                <div className='inputBox'>
                    <label htmlFor="username" className='labelOne'>Username:</label>
                    <input className='inputOne' id="username" type="text" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                    {username.length < 1 && accept && <p className='error'>Fill This Field, Please!</p>}
                </div>
                <div className='inputBox'>
                    <label htmlFor="email" className='labelOne'>Email:</label>
                    <input className='inputOne' id="email" type="email" placeholder="Email..." required value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError === 400 && accept && <p className='error'>This email already exists.</p>}
                </div>
                <div className='inputBox'>
                    <label htmlFor="password" className='labelOne'>Password:</label>
                    <input className='inputOne' id="password" type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    {password.length < 8 && accept && <p className='error'> Password must be more than 8 characters</p>}
                </div>
                <div  className='inputBox'>
                    <label htmlFor="confirm_password" className='labelOne'>Confirm Password:</label>
                    <input className='inputOne'  id="confirm_password" type="password" placeholder="Confirm Password..." value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {confirm_password !== password && accept && <p className='error'>Password does not match</p>}
                </div>

            </div>
            <div className='regBtn' style={{ textAlign:'center' }}>
                <button type='submit'>Register</button>
            </div>    
            <div style={{ padding:'15px ', margin:'10px' }}>
                <p style={{ textAlign:'center', fontWeight: '500' }}>Do You Have Account? <span><Link to='/login' style={{ textDecoration:'none',color:'#0079c1',fontWeight: 'bold',letterSpacing:'1px' }}>Login</Link></span></p>
            </div>
        </form>
</div>
       </div>

    );
}
