import React, { useContext, useEffect, useState } from 'react';
import { User } from '../Context/UserContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function LocationDetails({ locationId, onClose }) {
  const context = useContext(User);
  const token = context.auth.token;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/locations/${locationId}/`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setLocation(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = '/login';
        } else {
          console.error("Error fetching location details:", error);
        }
      }
    };

    fetchLocationDetails();
  }, [locationId, token]);

  if (!location) {
    return <p>Loading...</p>;
  }
  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}><FontAwesomeIcon icon={faTimes} /></span>
        {/* <p><strong>Id:</strong> {location.id}</p> */}
        <div >
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>Area:</strong> {location.name}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>aisle:</strong> {location.aisle}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>rack:</strong> {location.rack}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>level:</strong> {location.level}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>barcode:</strong> {location.barcode}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>capacity:</strong> {location.capacity}</p>
        <p style={{ letterSpacing:'0.5px',color:' #8493a5' }}><strong style={{ color:' #00457c' }}>warehouse:</strong> {location.warehouse}</p>
        </div>
      </div>
    </div>
  )
}

export default LocationDetails