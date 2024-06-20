const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./User')
const Cart = require('./Cart')
const port = 3000

const dbconnect = async ()=>{
    try{
    await mongoose.connect('mongodb://localhost:27017/pizza_application')
    console.log('Successfully connected to the database..')
    }
    catch(err){
      console.log('There is problem connecting to the database..',e)
    }
}
dbconnect()
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow methods
    allowedHeaders: ['Content-Type'],
  }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ Email: email });
      
      if (user && user.Password === password && user.Role==="user") {
          res.json({ auth: true,Firstname:user.Firstname,Role:user.Role,Email:user.Email });
      }
      else if(user && user.Password === password && user.Role==="admin"){
        res.json({ auth: true,Firstname:user.Firstname,Role:user.Role,Email:user.Email});
      }
      else {
          res.json({ auth: false });
      }
  } catch (err) {
      console.error('There is a problem signing in the user:', err);
      res.json({ error: 'Internal server error' });
  }
});

app.post('/signup' ,async (req,res)=>{
    const {Firstname,Lastname,Email,Password} = req.body
    try{
    const newUser = new User(
      {
        Firstname:Firstname,
        Lastname :Lastname,
        Email : Email,
        Password: Password,
        Role:"user"
      }
    )
    await newUser.save()
  }
    catch(err){
      console.log('There is a problem creating a user..')
    }
    res.json({created:true})
})
app.post('/addtocart',async (req,res)=>{
  const {Email,orders} = req.body
  try{
    const user = await Cart.findOne({ email: Email });
    if(user){
      user.orders = orders
      await user.save()
    }
    else{
      newcartuser = new Cart({email:Email,orders:orders})
      await newcartuser.save();
      console.log(`New cart created for ${Email}`);
    }
  }
  catch(err){
    console.log('There is a problem occured',err)
  }
  
})

app.post('/getcart', async (req, res) => {
  const { Email } = req.body;
  try {
    const cart = await Cart.findOne({ email: Email });
    if (cart) {
      res.json({ success: true, orders: cart.orders });
    } else {
      res.json({ success: false, message: 'No cart found' });
    }
  } catch (err) {
    console.log('There was a problem fetching the cart:', err);
    res.json({ success: false, error: 'Internal server error' });
  }
});
app.post('/userslist', async (req, res) => {
  try {
    const users = await User.find({}, 'Firstname Lastname Email Role');
    res.json({ success: true, users });
  } catch (err) {
    console.log('There is a problem fetching users:', err);
    res.json({ success: false, error: 'Internal server error' });
  }

});

app.post('/orderslist', async (req, res) => {
  try {
    const orders = await Cart.find({ 'orders.status': 'Order Placed' }, 'email orders');
    const simplifiedOrders = orders.map(order => ({
      email: order.email,
      orders: order.orders.filter(orderItem => orderItem.status === 'Order Placed').map(orderItem => ({
        _id: orderItem._id,
        pizzatitle: orderItem.pizzatitle,
        pizzasize: orderItem.pizzasize,
        quantity: orderItem.quantity,
        price: orderItem.price,
        status: orderItem.status
      }))
    }));

    res.json({ success: true, orders: simplifiedOrders });
  } catch (err) {
    console.log('There was a problem fetching orders:', err);
    res.json({ success: false, error: 'Internal server error' });
  }
});


app.post('/updateorderstatus', async (req, res) => {
  const { email, orderId, status } = req.body;
  try {
    const userCart = await Cart.findOneAndUpdate(
      { email, 'orders._id': orderId },
      { $set: { 'orders.$.status': status } },
      { new: true }
    );
    if (userCart) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log('There was a problem updating the order status:', err);
    res.json({ success: false, error: 'Internal server error' });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})