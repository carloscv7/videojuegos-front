import React from 'react';
import '../../App.css';
import SignupContainer from '../../containers/SignupContainer';
import Footer from '../Footer';
import FormDos from '../formsignup/FormDos';
import FormSignupDos from '../formsignup/FormSignupDos';
import Signup from '../signupform/Signup';



export default function SignUp() {
  return (
    
    <div>
        <h1>SignUp</h1>
        <FormDos />
        <Signup />
        <Footer />
        
    </div>
  
  )
}