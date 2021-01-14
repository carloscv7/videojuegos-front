import React from 'react';
import '../../App.css';
import Form from '../form/Form';
import FormInscription from '../FormInscription';
import HomeAnt from '../HomeAnt';
import FormVDos from '../form copy/FormVDos'

export default function Services() {
  return (
  
    <div>
      <h1 className='services'>SERVICES</h1>;
      <HomeAnt />
      <FormInscription />
      <Form />
      <FormVDos />
    </div>
  
  )
}