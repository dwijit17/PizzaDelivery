const mongoose = require('mongoose');

// Define the schema for each item in the cart
const orderSchema = new mongoose.Schema({
    pizzatitle: {
        type: String,
        required: true
    },
    pizzasize: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Order Yet to Place'
    }
});

// Define the Cart schema
const cartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    orders: [orderSchema] // An array of orderSchema objects
});

// Create the Cart model from the schema and export it
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
