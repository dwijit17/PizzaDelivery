import './App.css'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import Homepage from './Pages/Homepage'
import Pizzapage from './Pages/Pizzapage'
import Custompizza from './Pages/Custompizza'
import Adminpage from './Pages/Adminpage'
import Cart from './Pages/Cart'
import {createBrowserRouter,RouterProvider,Outlet,Link} from "react-router-dom"
import PrivateRoute from './Components/PrivateRoute'
import AuthContext from './Components/AuthContext'
import { CartProvider } from './Components/CartContext'
import Loggedinprofile from './Pages/Loggedinprofile'
const router = createBrowserRouter([
  {
    path:"/",
    element:<PrivateRoute/>,
    children:[
      {
        path:"/",
        element:<Homepage/>
      },
      {
        path:"/pizzas",
        element:<Pizzapage/>
      },
      {
        path:"/custompizza",
        element:<Custompizza/>
      },
      {
        path:"/admin",
        element:<Adminpage/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/profile",
        element:<Loggedinprofile/>
      }
    ]
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/register",
    element:<RegisterPage/>
  },
  
])


function App() {
  return (
    <AuthContext>
    <CartProvider>
    <RouterProvider  router={router}/>
    </CartProvider>
    </AuthContext>
  )
}

export default App
