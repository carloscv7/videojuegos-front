import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css"
import { signup } from '../apiCore';
import Footer from '../Footer';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const { name, email, password, success, error } = values

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value }) 
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false })
    signup({ name, email, password }).then(data => { 
      if (data.error) {
        setValues({ ...values, error: data.error, success: false })
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        })
      }
    })
  }

  const signUpForm = () => (
    <form className="sign-box">
      <div className='form-group'>
        <label className='text-muted'>Enter your Name</label>
        <input
          onChange={handleChange('name')}
          value={name}
          type='text'
          className='form-control'/>
      </div>
      <div className='form-group'>
        <label className='text-muted'>Enter your Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          value={email}
          className='form-control'/>
      </div>
      <div className='form-group'>
        <label>Enter your Password</label>
        <input
          onChange={handleChange('password')}
          value={password}
          type='password'
          className='form-control'/>

          <span className='form-input-login adjust-text'>
          Already have an account? Login <a href='/login'>here</a>
          </span>
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Sign Up
      </button>
    </form>
  );

  const showError = () => (
    <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showSuccess = () => (
    <div className='alert alert-info' style={{display: success ? '':'none'}}>  New Account Successfully Created You can now
      <Link to='/login'> Login</Link>
    </div>
  )

  return (
    <>
      <div className="mt-5">
        <h4 className="text-center mb-5">Get started with us today! Create your account by filling out the
          information below.</h4>
        {showError()}
        {showSuccess()}
        {signUpForm()}
        <Footer />
      </div>
    </>
  )
}

export default Signup;
