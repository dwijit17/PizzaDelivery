import React,{useState} from 'react'
import Pizzacard from '../Components/Pizzacard'
import { MDBBtn } from 'mdb-react-ui-kit';
import './Pizzapage.css'
import { Outlet,Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
const Pizzapage = () => {
  return (
    <>
    <Navbar/>
    <div className='grid-content'>
    <Pizzacard pizzatitle="CHICKEN TIKKA" imagename="chickentikkapizza.png" pizzaprice="250" className="grid-item"/>
    <Pizzacard pizzatitle="PEPPERONI" imagename="pepperonipizza.jpg" pizzaprice="300" className="grid-item"/>
    <Pizzacard pizzatitle="MARGHERITA" imagename="margheritapizza.jpg" pizzaprice="200" className="grid-item"/>
    <Pizzacard pizzatitle="VEGGIE SUPREME" imagename="veggiesupremepizza.jpg" pizzaprice="280" className="grid-item"/>
    <Pizzacard pizzatitle="BBQ CHICKEN" imagename="bbqchickenpizza.jpg" pizzaprice="320" className="grid-item"/>
    <Pizzacard pizzatitle="HAWAIIAN" imagename="hawaiianpizza.jpg" pizzaprice="270" className="grid-item"/>
    <Pizzacard pizzatitle="FOUR CHEESE" imagename="fourcheesepizza.jpg" pizzaprice="350" className="grid-item"/>
    <Pizzacard pizzatitle="MEAT LOVERS" imagename="meatloverspizza.jpg" pizzaprice="380" className="grid-item"/>
    <Pizzacard pizzatitle="MEXICAN GREEN WAVE" imagename="mexicangreenwavepizza.jpg" pizzaprice="310" className="grid-item"/>
    </div>
    <div className='custompizza'>
      <h3>Want to Make your Custom Pizza?</h3>
      <Link to={`/custompizza`}><MDBBtn color='danger'>Click Here!</MDBBtn></Link>
    </div>
    </>
  )
}

export default Pizzapage
