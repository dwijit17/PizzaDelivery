import React from 'react';
import { useState,useContext} from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { authvar } from '../Components/AuthContext';
const LoginPage = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [response, setResponse] = useState(null);
  const navigate  = useNavigate()
  const {login,setUser,setEmailGlobal} = useContext(authvar)
  const handleEmailchange = (e)=>{
      setEmail(e.target.value)
  }

  const handlePasswordchange = (e)=>{
    setPassword(e.target.value)
}
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = {email,password}
    try {
      const res = await axios.post('http://localhost:3000/signin', data);
      setResponse(res.data);
      console.log(res.data)
      if(res.data.auth){
        login()
        if(res.data.Role === "user"){
          navigate('/')
          setUser(res.data.Firstname)
          setEmailGlobal(res.data.Email)
        }
        else if(res.data.Role === "admin"){
          navigate('/admin')
          setUser(res.data.Firstname)
          setEmailGlobal(res.data.Email)
        }
      }
      else{
        alert('Incorrect Email or Password')
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <Navbar/>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={handleEmailchange}/>
    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={handlePasswordchange}/>

    <div className="d-flex justify-content-between mx-3 mb-4">
      <Link to="/forgot">Forgot password?</Link>
    </div>

    <MDBBtn className="mb-4" >Sign in</MDBBtn>

    <div className="text-center">
      <p>Not a member? <Link to={`/register`}>Register</Link></p>

      <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>

      </div>
    </div>

  </MDBContainer>
   </form>
  )
}

export default LoginPage
