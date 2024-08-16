import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import UserProvider from './Pages/Context/UserContext';
//import '../Pages/LoginRegister/LoginRegister.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode  >
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

