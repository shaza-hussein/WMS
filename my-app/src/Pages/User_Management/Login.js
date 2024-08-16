import '../../Style.css';
import {useContext, useState} from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import axios from "axios";
import { User } from '../Context/UserContext';



export default function Login(){

    const [username_or_email, setUsernameOrEmail]=useState(""); 
    const [password,setPassword]=useState("");
    const [accept,setAccept]= useState(false); 
    const [emailError,setEmailError]= useState("");
    const navigate = useNavigate();
    const userNow= useContext(User);
    // console.log(userNow);

    async function submit (e){
        let flag = true;
        e.preventDefault();
        setAccept(true);
        if( username_or_email.length < 1 || password.length < 8  ){
            flag = false;
        }else {
            flag = true;
        }
        try{
            if(flag){
                let response =  await  axios.post(' http://127.0.0.1:8000/api/login/',{
                    username_or_email:username_or_email, 
                    password:password,
                });
                const token = response.data.access_token;
                const userDetails = response.data.user;
                // console.log(token);
                // console.log(userDetails);
                userNow.setAuth({token,userDetails});
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.access_token);
                    navigate('/home');
                }
                }
        }catch(err){
            setEmailError(err.response.status);
        }
        }
    
    return(
        <div  className="bodyReg">
            <div  className='containerReg' style={{ width:'550px' }}>
            <div className='title'>
                <p className='registration'>Login</p>
            </div>
            <form onSubmit={submit} >
            <div className='userDetails' >
            <div className='inputBox' style={{ width:'100%' }}>
            <label htmlFor="username_or_email" className='labelOne'>Username_or_Email:</label>
            <input className='inputOne' id="username_or_email"  type="text"  placeholder="Username_or_Email..." required  value={username_or_email} onChange={(e)=>setUsernameOrEmail(e.target.value)} />
            {emailError ===400 && accept && <p className='error' >Unable to log in with provided credentials.</p>}
            </div>
{/* --------password--------- */}
            <div className='inputBox' style={{ width:'100%' }}>
            <label htmlFor="password" className='labelOne'>Password:</label>
            <input className='inputOne' id="password"  type="password"  placeholder="Password..."  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            { password.length < 8 && accept  && <p className='error'> Password must be more than 8 character</p>}
            </div>

            
            </div>
            <div  className='regBtn' style={{ textAlign:'center' }}>
                <button type='submit'>Login</button>
            </div>
        
            <div style={{ padding:'15px ', margin:'10px' }}>
                <p style={{ textAlign:'center', fontWeight: '500' }}>Don't You Have Account? <span><Link to='/' style={{ textDecoration:'none',color:'#0079c1',fontWeight: 'bold' }}>Register</Link></span></p>
            </div>
        </form>
        </div>
        </div>
        );
}