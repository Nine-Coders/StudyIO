import React, { useState, useEffect, useContext, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Login from './Login.jsx';
import SignupModal from './SignupModal.jsx';
import axios from 'axios';
import config from '../../../../server/config.js';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: 24,
  padding: '24px'
};

const LoginSx = {
  border: '1px solid #FAA307',
  borderRadius: '15px',
  color: '#4285F4',
  background: 'white',
  height: '50px',
  width: '100px',
  marginRight: '36px',
  color: '#FAA307',
  fontSize: '30px',
  cursor: 'pointer',
  zIndex: 2000,
}

const inputSx = {
  height: '48px',
  width: '360px',
  marginTop: '12px',
  borderRadius: '6px',
  border: '1px solid #888b8e',
  color: '#333',
  paddingLeft: '16px',
  fontFamily: 'sans-serif',
}

const loginButtonSx = {
  height: '32px',
  width: '120px',
  marginTop: '12px',
  borderRadius: '6px',
  border: '1px solid #ffb703',
  color: 'white',
  fontFamily: 'sans-serif',
  background: '#FAA307',
  cursor: 'pointer'
}



let LoginModal = (props) => {
  const _isMounted = useRef(true);
  // Modal hooks
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
        _isMounted.current = false;
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${config.api_url}/users/auth`, {
      email: email,
      password: password
    })
    .then(function (response) {
      if (_isMounted.current) {
        if (response.data === false) {
          alert('Login failed. Email or password is incorrect.')
        } else if (typeof(response.data) === "object"){
          const firstLastName = response.data.first_name + ' ' + response.data.last_name;
          props.setUserId(response.data.id);
          props.setUserName(firstLastName);
          props.setLogin(true);
          setEmail('');
          setPassword('');
          handleClose();
        } else {
          alert('Something went wrong!')
        }
      }
    })
    .catch(function (error) {
      alert('Something went wrong! Please try again in a few minutes.')
      console.log(error);
    });
  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div>
      <button
        style={LoginSx}
        onClick={handleOpen}
      >
        Log in
      </button>
      <Modal open={props.open} onClose={handleClose} >
        <div style={modalStyle}>
          <h3>Log in</h3>
          <form onSubmit={handleLogin}>
            <div>
              <input style={inputSx} placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div>
              <input style={inputSx} placeholder="Enter password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button style={loginButtonSx}>Log in</button>
          </form>
          <SignupModal />
          <br />
          <br />
          <Login
            userId={props.userId}
            setUserId={props.setUserId}
            userName={props.userName}
            setUserName={props.setUserName}
            login={props.login}
            setLogin={props.setLogin}/>
        </div>
      </Modal>
    </div>
  )
}

export default LoginModal;