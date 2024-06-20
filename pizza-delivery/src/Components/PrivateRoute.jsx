import React,{useContext} from 'react'
import { authvar } from './AuthContext'
import {createBrowserRouter,RouterProvider,Outlet,Navigate} from "react-router-dom"
const PrivateRoute = () => {
    const {isAuthenticated} = useContext(authvar)
  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoute
