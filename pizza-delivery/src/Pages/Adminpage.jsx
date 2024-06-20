import React, { useContext, useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import "./Adminpage.css";
import { authvar } from "../Components/AuthContext";
import axios from "axios";

const Adminpage = () => {
  const {
    logout,
    userslist,
    fetchUsers,
    orderslist,
    fetchOrders,
    clickeduserslist,
    setClickedUsersList,
    clickedorderslist,
    setClickedOrdersList,
  } = useContext(authvar);
  const [view, setView] = useState("users"); // 'users' or 'orders'

  useEffect(() => {
    if (view === "users") {
      fetchUsers();
    } else if (view === "orders") {
      fetchOrders();
    }
  }, [view]);

  const handleLogout = () => {
    logout();
  };

  const handleOrderStatusUpdate = async (email, orderId, newStatus) => {
    try {
      const res = await axios.post("http://localhost:3000/updateorderstatus", { email, orderId, status: newStatus });
      if (res.data.success) {
        fetchOrders(); // Refresh the orders list
      }
    } catch (err) {
      console.log("There was a problem updating the order status:", err);
    }
  };

  return (
    <div className="admincontainer">
      <h1>Admin Panel</h1>
      <MDBBtn onClick={handleLogout}>Logout</MDBBtn>
      <div className="admin-buttons">
        <MDBBtn onClick={() => setView("users")}>User List</MDBBtn>
        <MDBBtn onClick={() => setView("orders")}>Order List</MDBBtn>
      </div>
      {view === "users" && (
        <table className="users-table">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userslist.map((user) => (
              <tr key={user._id}>
                <td>{user.Firstname}</td>
                <td>{user.Lastname}</td>
                <td>{user.Email}</td>
                <td>{user.Role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {view === "orders" && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Pizza Title</th>
              <th>Pizza Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderslist.flatMap((order) =>
              order.orders.map((item) => (
                <tr key={item._id}>
                  <td>{order.email}</td>
                  <td>{item.pizzatitle}</td>
                  <td>{item.pizzasize}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <td>
                    <MDBBtn color="success" onClick={() => handleOrderStatusUpdate(order.email, item._id, "Delivered")}>
                      Deliver
                    </MDBBtn>
                    <MDBBtn color="danger" onClick={() => handleOrderStatusUpdate(order.email, item._id, "Not able to deliver")}>
                      Cancel
                    </MDBBtn>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Adminpage;
