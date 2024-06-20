import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { useState} from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [userdata,setUserdata] = useState({Firstname:'',Lastname:'',Email:'',Password:''})
  const [response,setResponse] = useState(null)
  const navigate = useNavigate()
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserdata({ ...userdata, [id]: value });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = userdata
    try {
      const res = await axios.post('http://localhost:3000/signup', data);
      setResponse(res.data);
      if(res.data.created){
          navigate('/login')
      }
      else{
        alert('There is a problem in creating your account please try later..')
      }
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <Navbar/>
    <MDBContainer fluid>

      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Sign up now</h2>

          <MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='First name'  id = 'Firstname' type='text' value={userdata.Firstname} onChange={handleInputChange}/>
            </MDBCol>

            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Last name'  id = 'Lastname' type='text' value={userdata.Lastname} onChange={handleInputChange}/>
            </MDBCol>
          </MDBRow>

          <MDBInput wrapperClass='mb-4' label='Email'  type='email' id='Email' value={userdata.Email} onChange={handleInputChange}/>
          <MDBInput wrapperClass='mb-4' label='Password'  type='password' id = 'Password' value={userdata.Password} onChange={handleInputChange}/>

          <MDBBtn className='w-100 mb-4' size='md' type='submit'>sign up</MDBBtn>

          <div className="text-center">

          </div>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
    </form>
  )
}

export default RegisterPage
