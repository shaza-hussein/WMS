import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUsers,
  faTable,
  faPaperclip,
  faRightFromBracket,
  faTruckField,
  faWarehouse,
  faCartFlatbed,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faFirstOrderAlt ,faSupple } from '@fortawesome/free-brands-svg-icons';
import '../Style.css';
import { User } from '../Pages/Context/UserContext';
import axios from 'axios';


function SideMenu() {
  // const img = "../asstes/wms-logo-final.png";
  const context = useContext(User);
  const token = context.auth.token;
  const navigate = useNavigate();

  async function handelLogOut(){
      await axios.post('http://127.0.0.1:8000/api/logout/',null,{
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          });
          navigate('/');
  }
    return (

        <div className='menu'>
          <ul className='list'>
        <li className="profile">
          <div className="img-box" >
          
          <FontAwesomeIcon icon={faWarehouse}  style={{ fontSize:'25px' , color:'#00457c',textAlign:'center' }}/>
          </div>
          <h2><span style={{ fontSize:'25px' }}>S.A.D</span> <span><small style={{ textTransform:'lowercase' }}>wms</small></span></h2>
        </li>
        <li>
          <Link className='active link' to="/home">
            <FontAwesomeIcon icon={faHouse} className='icon' />
            dashboard
          </Link>
        </li>
        <li>
          <Link to="/staff"  className='link'>
            <FontAwesomeIcon icon={faUsers} className='icon' />
            staff
          </Link>
        </li>
        <li>
          <Link to="/products" className='link'>
            <FontAwesomeIcon icon={faTable} className='icon' />
            products
          </Link>
        </li>
        <li>
          <Link to="/supplier" className='link'>
          <FontAwesomeIcon icon={faSupple} className='icon' />
            supplier
          </Link>
        </li>
        <li>
          <Link to="/orders" className='link'>
            <FontAwesomeIcon icon={faFirstOrderAlt} className='icon' />
            orders
          </Link>
        </li>
        <li>
          <Link to="/reports" className='link'>
            <FontAwesomeIcon icon={faPaperclip} className='icon' />
            Reports
          </Link>
        </li>
        <li>
          <Link to="/shipments" className='link'>
          <FontAwesomeIcon icon={faTruckField}  className='icon'/>
            shipments
          </Link>
        </li>
        <li>
          <Link to="/inventory" className='link'>
          <FontAwesomeIcon icon={faCartFlatbed} className='icon'/>
            inventory
          </Link>
        </li>
        <li>
          <Link to="/locations" className='link'>
          <FontAwesomeIcon icon={faLocationDot} className='icon' />
            locations
          </Link>
        </li>
        <li>
          <Link to="/logout" className='link' onClick={handelLogOut}>
            <FontAwesomeIcon icon={faRightFromBracket} className='icon' />
            Log Out
          </Link>
        </li>
          </ul>
    </div>
    );
}

export default SideMenu;