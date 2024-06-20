import React from "react";
import Navbar from "../Components/Navbar";
import { MDBBtn } from "mdb-react-ui-kit";
import "./Homepage.css";
import { Outlet,Link } from "react-router-dom";
const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="main-banner">
        <div className="content">
          <h5>PIZZACUBE brings</h5>
          <h5>Delicious and Hot Pizzas for you..</h5>
          <h5 className="caption">Handcrafted Pizzas that Bring People Together.</h5>
          <Link to={`/pizzas`} className="ordernow">
          <MDBBtn className="me-1" color="danger">
            Order Now
          </MDBBtn>
          </Link>
        </div>
        <div className="img-block">
          <img
            src="src\assets\pizzaimage.jpg"
            alt="pizzaimage"
            className="pizzaimage"
          />
        </div>
      </div>
      <div className="center-banner">
        <div className="side-img">
          <img src="src\assets\pizzaimageside.jpg" alt="pizzaimage" />
        </div>
        <div className="side-content">
          Create your own special pizza with our customizable options. Choose
          from a variety of the freshest ingredients to craft a unique flavor
          combination. Whether you prefer classic toppings or something new, our
          menu ensures every pizza is a personal masterpiece. Enjoy a pizza made
          just for you.
        </div>
      </div>
      <div className="end-content">
        <div className="grid-container">
            <div className="grid-item"><img src="src\assets\hygiene.png" className='special-icon' />100% Hygiene</div>
            <div className="grid-item"><img src="src\assets\freshveggies.png" className='special-icon' />Fresh Veggies</div>
            <div className="grid-item"><img src="src\assets\premiumcheese.png" className='special-icon' />Premium Cheese</div>
            <div className="grid-item"><img src="src\assets\organic.png" className='special-icon' />Organic Ingredients</div>
            <div className="grid-item"><img src="src\assets\artificial.png" className='special-icon' />No Artificial Additives</div>
            <div className="grid-item"><img src="src\assets\eco.png" className='special-icon' />Eco-Friendly Packaging</div>
        </div>
      </div>
      <footer>&copy; Copyright Dwijit Dasari - 2024</footer>
    </>
  );
};

export default Homepage;
