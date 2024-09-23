import React from 'react';
import './Navbar.css';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { NavLink } from 'react-router-dom';
import { assets } from "../../assets/assets";

const Navbar = ({ onLogout }) => { // Receive onLogout as a prop
  return (
    <nav className='navbar'>
      <img className='logo' src={assets.logo1} alt="Logo" />
      <div className='navbar-links'>
        <NavLink to='/addfood' className='navbar-link'>
        <MenuBookIcon />
          <span>Add Items</span>
        </NavLink>
        <NavLink to='/listfood' className='navbar-link'>
          <MenuBookIcon />
          <span>List Items</span>
        </NavLink>
        <NavLink to='/orders' className='navbar-link'>
          <ShoppingCartIcon />
          <span>Orders</span>
        </NavLink>
      </div>
      <div className='navbar-profile'>
        <PersonOutlineIcon className='profile' />
        <ExitToAppIcon className='logout' onClick={onLogout} />
      </div>
    </nav>
  );
};

export default Navbar;

