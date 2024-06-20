import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const authvar = createContext();

const AuthContext = ({ children }) => {
  const [isAuthenticated, setAuthentication] = useState(false);
  const [user, setUser] = useState(null);
  const [emailglobal, setEmailGlobal] = useState(null);
  const [userslist, setUserslist] = useState([]);
  const [clickeduserslist, setClickedUsersList] = useState(false);
  const [orderslist, setOrdersList] = useState([]);
  const [clickedorderslist, setClickedOrdersList] = useState(false);

  const login = () => {
    setAuthentication(true);
  };

  const logout = () => {
    setAuthentication(false);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.post("http://localhost:3000/userslist");
      if (res.data.success) {
        setUserslist(res.data.users);
      }
    } catch (err) {
      console.error("There was a problem fetching users:", err);
    }
  };
  

  const fetchOrders = async () => {
    try {
      const res = await axios.post("http://localhost:3000/orderslist");
      if (res.data.success) {
        setOrdersList(res.data.orders);
      }
    } catch (err) {
      console.error("There was a problem fetching orders:", err);
    }
  };

  return (
    <authvar.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        login,
        logout,
        user,
        setUser,
        emailglobal,
        setEmailGlobal,
        userslist,
        setUserslist,
        clickeduserslist,
        setClickedUsersList,
        orderslist,
        setOrdersList,
        clickedorderslist,
        setClickedOrdersList,
        fetchUsers,
        fetchOrders,
      }}
    >
      {children}
    </authvar.Provider>
  );
};

export default AuthContext;
