import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Account from './Account.jsx';
import LoginModal from './LoginModal.jsx';
import IconButton from '@mui/material/IconButton';
import './navBar.scss';

let navSx = {
  color: 'white',
  width: '100%',
  height: '70px',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  background: '#FAA307',
  display: 'flex',
  // mb: '20px',
  justifyContent: 'space-around',
  gap: '35%',
  alignItems: 'center',
  zIndex: 1201,
}

let Navbar = (props) => {
  const navigate = useNavigate();
  const handleHomeClick = (e) => {
    navigate('/')
  }

  return (
    <div style={navSx} className="navBar">
      <IconButton
        className="home-button"
        size="large"
        color="inherit"
        sx={{ mr: 2, ml: 4 }}
        onClick={handleHomeClick}
      >
        <span style={{}}><img style={{maxWidth:'115px'}} src={'../../../logo/studyIO.webp'}/></span>
      </IconButton>
      {props.login === true ?
      <Account
      userId={props.userId}
      roomId={props.roomId}
      setUserId={props.setUserId}
      userName={props.userName}
      setUserName={props.setUserName}
      login={props.login}
      setLogin={props.setLogin} /> :
      <LoginModal
      userId={props.userId}
      setUserId={props.setUserId}
      userName={props.userName}
      setUserName={props.setUserName}
      login={props.login}
      setLogin={props.setLogin}
      open={props.open}
      setOpen={props.setOpen} />}
    </div>
  )
}

export default Navbar;