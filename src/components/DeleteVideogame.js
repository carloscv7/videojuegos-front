import React, {useEffect, useState} from 'react';
import NavbarCM from './NavbarCM';
import { getCategories, isAuthenticated, createVideogame, getTournaments} from './apiCore'
import Footer from './Footer';

const DeleteVideogame = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdVideogame: '',
    redirectToProfile: false,
    formData: ''
  })  
  const { user, token } = isAuthenticated()
  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    photo,
    loading,
    error,
    createdVideogame,
    redirectToProfile,
    formData
  } = values;

  //Inicializar los tonneos que estan cargadas en la base de datos
  const init = () => {
    getTournaments().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    setValues({...values, formData: new FormData()});
    init();
  }, []); 

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdVideogame ? '' : 'none' }}
    >
      <h2>{`${createdVideogame} was succesfully deleted`}</h2>
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading ...</h2>
      </div>
    )

  const clickSubmit = event => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })
    createVideogame(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdVideogame: data.name
        })
      }
    })
  }

  const newVideogameForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>    
      
      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select
          onChange={handleChange('category')}
          type='text'
          className='form-control'
        >
          <option>Select a Tournament</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      
      <button className='btn btn-outline-primary'>Delete Tournament Confirmation</button>
    </form>
  )

  return (
    <>
      <div className="conatiner mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>With this option, you can delete a Tournament you had created before</h2>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newVideogameForm()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DeleteVideogame;