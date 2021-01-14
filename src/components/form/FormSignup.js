import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
        <form onSubmit={handleSubmit} className='form' noValidate>
            <h1>
            ¿Are you ready to rock? - Create your team and add your teammates by filling out the
            information below.
            </h1>
            <div className='form-inputs'>
                <label className='form-label'>Team`s Name</label>
                <input
                    className='form-input'
                    type='text'
                    name='teamName'
                    placeholder='Enter the name of the Team'
                    value={values.teamName}
                    onChange={handleChange}
                />
                {errors.teamName && <p>{errors.teamName}</p>}
            </div>
            <div className='form-inputs'>
            <label className='form-label'>Activision ID Player One</label>
            <input
                className='form-input'
                type='text'
                name='playerOne'
                placeholder='Enter the Activision ID for Player One'
                value={values.playerOne}
                onChange={handleChange}
            />
            {errors.playerOne && <p>{errors.playerOne}</p>}
            </div>

            <div className='form-inputs'>
            <label className='form-label'>Activision ID Player Two</label>
            <input
                className='form-input'
                type='text'
                name='playerTwo'
                placeholder='Enter the Activision ID for Player Two'
                value={values.playerTwo}
                onChange={handleChange}
            />
            {errors.playerTwo && <p>{errors.playerTwo}</p>}
            </div>

            <div className='form-inputs'>
                <label className='form-label'>Activision ID Player Three</label>
                <input
                    className='form-input'
                    type='text'
                    name='playerThree'
                    placeholder='Enter the Activision ID for Player Three'
                    value={values.playerThree}
                    onChange={handleChange}
                />
            {errors.playerThree&& <p>{errors.playerThree}</p>}
            </div>

            <div className='form-inputs'>
                <label className='form-label'>Activision ID Player Four</label>
                <input
                    className='form-input'
                    type='text'
                    name='playerFour'
                    placeholder='Enter the Activision ID for Player Four'
                    value={values.playerFour}
                    onChange={handleChange}
                />
                {errors.playerFour && <p>{errors.playerFour}</p>}
            
            </div>
                        
            <button className='form-input-btn' type='submit'>
            Register Team
            </button>
            <span className='form-input-login'>
            Already have an account? Login <a href='#'>here</a>
            </span>
        </form>
    </div>
  );
};

export default FormSignup;