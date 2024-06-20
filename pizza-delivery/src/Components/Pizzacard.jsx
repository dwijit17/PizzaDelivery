import React,{useState,useContext} from 'react'
import { MDBBtn } from 'mdb-react-ui-kit';
import './Pizzacard.css'
import { useCart} from './CartContext';
import axios from 'axios';
import { authvar } from './AuthContext';

const Pizzacard = (props) => {
  const { addToCart,cartitems } = useCart();
  const [selectedSize, setSelectedSize] = useState('Small');
  const [quantity, setQuantity] = useState(1);
  const {emailglobal} = useContext(authvar)
  const handleAddtocart = async()=>{

    const newItem = {
      pizzatitle: props.pizzatitle,
      pizzasize: selectedSize,
      quantity: quantity,
      price: props.pizzaprice * quantity,
      status:'Order Yet to Place..'
    };
    addToCart(newItem)
    try {
      const res = await axios.post('http://localhost:3000/addtocart', {Email:emailglobal,orders:[...cartitems, newItem]});
      console.log('Cart updated successfully:', res.data);
    } catch (err) {
      console.log('There was a problem updating the cart.', err);
    }

    alert('Items Added to Cart..');
  }
  return (
    <div className='pizzacard'>
      <h4>{props.pizzatitle}</h4>
      <img src={`src\\assets\\${props.imagename}`} alt="pizzaimage" className='pizzaimage'/>
      <div>
      <label htmlFor="Sizes">Sizes</label>
      <select name="Size" id="Size" value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}>
       <option value="Small">Small</option>
       <option value="Medium">Medium</option>
       <option value="Large">Large</option>
      </select>
      &nbsp;&nbsp;&nbsp;
      <label htmlFor="quantity">Quantity</label>
      <input type="number" id="quantity" name="quantity" min="1" max="10" value={quantity}
          onChange={(e) => setQuantity(e.target.valueAsNumber)}/>
      <div className='pricebottom'>
      <h5>Price {props.pizzaprice}Rs/-</h5>
      &nbsp;&nbsp;
      <MDBBtn color='danger' onClick={handleAddtocart}>Add to Cart</MDBBtn>
      </div>
      </div>
    </div>
  )
}

export default Pizzacard
