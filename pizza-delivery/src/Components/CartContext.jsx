import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { authvar } from './AuthContext';
export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartitems, setCartitems] = useState([]);
  const {emailglobal} = useContext(authvar)
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.post('http://localhost:3000/getcart', { Email: emailglobal});
        if (res.data.success) {
          setCartitems(res.data.orders);
        } else {
          console.log('No cart found for this user.');
        }
      } catch (err) {
        console.log('There was a problem fetching the cart.', err);
      }
    };

    if (emailglobal) {
      fetchCartItems();
    }
  }, [emailglobal]);

  const addToCart = (item) => {
    setCartitems([...cartitems, item]);
    
  };

  const removeFromCart = async (index,email) => {
    let check = confirm('Do you really want to remove this item from cart?This will also cancel your order!')
    if(check){
    const newCartItems = [...cartitems];
    newCartItems.splice(index, 1);
    setCartitems(newCartItems);
    try {
      const res = await axios.post('http://localhost:3000/addtocart', {Email:email,orders:newCartItems});
      console.log('Cart updated successfully:', res.data);
    } catch (err) {
      console.log('There was a problem updating the cart.', err);
    }
  }
  };

  
  return (
    <CartContext.Provider value={{ cartitems, addToCart, removeFromCart,setCartitems}}>
      {children}
    </CartContext.Provider>
  );
};
