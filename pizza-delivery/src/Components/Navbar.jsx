import React from 'react'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBadge
  } from 'mdb-react-ui-kit';
import './Navbar.css'
import { Outlet,Link } from 'react-router-dom';
import { useCart } from './CartContext';
import {useContext,useState} from 'react'
import { authvar } from './AuthContext'
import Loggedinprofile from '../Pages/Loggedinprofile';
const Navbar = () => {
  const { cartitems } = useCart();
  const {isAuthenticated} = useContext(authvar)
  const itemcount  = cartitems.length
  return (
    <MDBNavbar expand='lg' light bgColor='danger' className='navbar'>
    <MDBContainer fluid>
    {isAuthenticated ? <Link to='/'><h3 className='company-name'>PIZZACUBE</h3></Link> : <Link to='/login'><h3 className='company-name'>PIZZACUBE</h3></Link> }
      <MDBNavbarNav>
        <MDBNavbarItem className='ms-auto'>
          <MDBNavbarLink href='#'>
            <span>
            {isAuthenticated ? <Link to={`/profile`}>
            <MDBIcon fas icon="user-alt" />
            </Link> :
            <Link to={`/login`}>
            <MDBIcon fas icon="user-alt" />
            </Link>}
            </span>
            <span>
            <Link to={`/cart`}><MDBIcon fas icon='shopping-cart' className='ordericon'></MDBIcon></Link>
              <MDBBadge pill color='danger'>{isAuthenticated ? itemcount : 0}</MDBBadge>
            </span>
            
          </MDBNavbarLink>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBContainer>
  </MDBNavbar>
  )
}

export default Navbar
