import React,{useContext, useState} from 'react'
import { MDBBtn } from 'mdb-react-ui-kit';
import './Custompizza.css'
import { Outlet,Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useCart } from '../Components/CartContext';
import axios from 'axios';
import { authvar } from '../Components/AuthContext';
const Custompizza = () => {
  const [selectedSize, setSelectedSize] = useState('Small');
  const [quantity, setQuantity] = useState(1);
  const [selectedBase, setSelectedBase] = useState('Classic Hand-Tossed');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState('Classic Tomato Sauce');
  const [selectedCheese, setSelectedCheese] = useState('Mozzarella');
  const { cartitems, setCartitems } = useCart();
  const {emailglobal} = useContext(authvar)
  const handleAddCart = async ()=>{
    const basePrices = {
      'Classic Hand-Tossed': 50,
      'Thin Crust': 40,
      'Cauliflower Crust': 30,
      'Sourdough Crust': 50,
      'Pan Crust': 20
    };

    const saucePrices = {
      'Classic Tomato Sauce': 50,
      'Pesto Sauce': 40,
      'Alfredo Sauce': 30,
      'Barbecue Sauce': 50,
      'Buffalo Sauce': 20
    };

    const cheesePrices = {
      'Mozzarella': 50,
      'Parmesan': 40,
      'Provolone': 30,
      'Cheddar': 50,
      'Gorgonzola': 20
    };

    const basePrice = basePrices[selectedBase];
    const saucePrice = saucePrices[selectedSauce];
    const cheesePrice = cheesePrices[selectedCheese];
    const toppingsPrice = selectedToppings.length * 20; // Assuming each topping costs 20Rs
    const pizzaPrice = basePrice + saucePrice + cheesePrice + toppingsPrice;

    const newItem = {
      pizzatitle: 'Custom-Made',
      pizzasize: selectedSize,
      quantity: quantity,
      price: pizzaPrice * quantity ,// Calculate total price based on quantity
      status:'Order Yet to Place..'
    };

    setCartitems([...cartitems, newItem]);
    alert('Pizza Added to cart.. ')
    try{
        await axios.post('http://localhost:3000/addtocart',{Email:emailglobal,orders:[...cartitems,newItem]})
    }
    catch(err){
      console.log('There is a problem adding custom pizza..',err)
    }
  }

  const handleToppingsChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedToppings([...selectedToppings, value]);
    } else {
      setSelectedToppings(selectedToppings.filter((topping) => topping !== value));
    }
  };
  return (
    <>
      <Navbar />
      <div className='flex-container'>
        <div className='custompizza-different'>
          <img src="src/assets/custompizza.jpg" alt="pizza" />
          <hr />
          <h3 className='custompizzaheader'>Create Your Own Custom Pizza</h3>
          <div>
            <input type="radio" className="rads" name="Size" value="Small" checked={selectedSize === 'Small'} onChange={(e) => setSelectedSize(e.target.value)} />
            <label htmlFor="Size">Small</label>
            <input type="radio" className="rads" name="Size" value="Medium" checked={selectedSize === 'Medium'} onChange={(e) => setSelectedSize(e.target.value)} />
            <label htmlFor="Size">Medium</label>
            <input type="radio" className="rads" name="Size" value="Large" checked={selectedSize === 'Large'} onChange={(e) => setSelectedSize(e.target.value)} />
            <label htmlFor="Size">Large</label>
          </div>
          <div className='baseforpizza'>
            <br />
            <label htmlFor="base"><h4>Choose a Base</h4></label>
            <br />
            <select name="base" id="base" className='baseselect' value={selectedBase} onChange={(e) => setSelectedBase(e.target.value)}>
              <option value="Classic Hand-Tossed">Classic Hand-Tossed | 50Rs</option>
              <option value="Thin Crust">Thin Crust | 40Rs</option>
              <option value="Cauliflower Crust">Cauliflower Crust | 30Rs</option>
              <option value="Sourdough Crust">Sourdough Crust | 50Rs</option>
              <option value="Pan Crust">Pan Crust | 20Rs</option>
            </select>
          </div>
          <br />
          <div className='pizzatoppings'>
            <h4>Select any Toppings</h4>
            <input type="checkbox" id="onions" name="onions" value="Onions" onChange={handleToppingsChange} />
            <label htmlFor="onions"> Onions</label><br />
            <input type="checkbox" id="chicken" name="chicken" value="Chicken" onChange={handleToppingsChange} />
            <label htmlFor="chicken"> Chicken</label><br />
            <input type="checkbox" id="capsicum" name="capsicum" value="Capsicum" onChange={handleToppingsChange} />
            <label htmlFor="capsicum"> Capsicum</label><br /><br />
          </div>

          <div className='sauces'>
            <label htmlFor="sauce"><h4>Choose a Sauce</h4></label>
            <br />
            <select name="sauce" id="sauce" className='sauceselect' value={selectedSauce} onChange={(e) => setSelectedSauce(e.target.value)}>
              <option value="Classic Tomato Sauce">Classic Tomato Sauce | 50Rs</option>
              <option value="Pesto Sauce">Pesto Sauce | 40Rs</option>
              <option value="Alfredo Sauce">Alfredo Sauce | 30Rs</option>
              <option value="Barbecue Sauce">Barbecue Sauce | 50Rs</option>
              <option value="Buffalo Sauce">Buffalo Sauce | 20Rs</option>
            </select>
          </div>
          <br />
          <div className='cheese'>
            <label htmlFor="cheese"><h4>Choose a Cheese</h4></label>
            <br />
            <select name="cheese" id="cheese" className='cheeseselect' value={selectedCheese} onChange={(e) => setSelectedCheese(e.target.value)}>
              <option value="Mozzarella">Mozzarella | 50Rs</option>
              <option value="Parmesan">Parmesan | 40Rs</option>
              <option value="Provolone">Provolone | 30Rs</option>
              <option value="Cheddar">Cheddar | 50Rs</option>
              <option value="Gorgonzola">Gorgonzola | 20Rs</option>
            </select>
          </div>
          <br />
          <div className='quanselect'>
            <label htmlFor="quantity"><h4>Quantity</h4></label>
            <input type="number" id="quantity" name="quantity" min="1" max="10" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <br />
          <MDBBtn color='danger' onClick={handleAddCart}>Add to Cart!</MDBBtn>
        </div>
      </div>
    </>
  )
}

export default Custompizza
