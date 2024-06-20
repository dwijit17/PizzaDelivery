import React,{useContext} from 'react';
import { useCart } from '../Components/CartContext';
import './Cart.css'
import Navbar from '../Components/Navbar';
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import { authvar } from '../Components/AuthContext';
import axios from 'axios';
const Cart = () => {
  const { cartitems,removeFromCart,setCartitems} = useCart();
  const {emailglobal} = useContext(authvar);
  const itemcount  = cartitems.length
  const emptyCart = async ()=>{
    alert('Thankyou for ordering with us.Your Order has been Received and will be Delivered Shortly.')
    const updatedCartitems = cartitems.map((item)=>({
        ...item,
        status:'Order Placed'
      }))
    setCartitems(updatedCartitems)
    try{
      await axios.post('http://localhost:3000/addtocart',{Email:emailglobal,orders:updatedCartitems})
    }
    catch(err){
      console.log('There is a problem occured at cart when placing order')
    }
  }
  return (
    <>
    <Navbar/>
    <div>
    <h2>Cart Items</h2>
    <ul>
      {cartitems.map((item, index) => (
        <li key={index} className='cartitem'>
          <div>
            <h3>{item.pizzatitle}</h3>
            <p>Size: {item.pizzasize}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: {item.price} Rs/-</p>
            <p>Status:{item.status}</p>
          </div>
          <img src="src\assets\deletelogo.png" className='deleteicon' onClick={()=>removeFromCart(index,emailglobal)}/>
        </li>
      ))}
    </ul>
    {itemcount ? <Link to={`/cart`} className="ordernow">
          <MDBBtn className="me-1" color="danger" onClick={emptyCart}>
            Place Order
          </MDBBtn>
    </Link>: <></>}
  </div>
  </>
  );
};

export default Cart;
