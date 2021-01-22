import React, { useState } from 'react';
import './FormLogin.css';
import FormSignupLogin from './FormSignupLogin';
import FormSuccessLogin from './FormSuccessLogin';



const FormToLogin = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          {/* <img className='form-img' src='img-2.svg' alt='spaceship' /> */}
        </div>
        {!isSubmitted ? (
          <FormSignupLogin submitForm={submitForm} />
        ) : (
          <FormSuccessLogin />
        )}
      </div>
    </>
  );
};

export default FormToLogin;
