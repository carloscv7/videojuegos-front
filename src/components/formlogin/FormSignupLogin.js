import React from 'react';
import validateInfoLogin from './validateInfoLogin';
import useFormLogin from './useFormLogin';
import './FormLogin.css';

const FormSignupLogin = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useFormLogin(
    submitForm,
    validateInfoLogin
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Enter your information to Sign in.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign in
        </button>
        <span className='form-input-login'>
          No account? Create one! <a href='/sign-up'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignupLogin;
