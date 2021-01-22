import React, { useState } from 'react';
import './FormDos.css';
import FormSignupDos from './FormSignupDos';
import FormSuccessDos from './FormSuccessDos';

const FormDos = () => {
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
          <FormSignupDos submitForm={submitForm} />
        ) : (
          <FormSuccessDos />
        )}
      </div>
    </>
  );
};

export default FormDos;
