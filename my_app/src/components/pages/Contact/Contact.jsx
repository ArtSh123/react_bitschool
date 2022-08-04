import React, { useState } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import styles from './styles.module.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    message: ''
  });
  const [errors, setErrors] = useState({
    name: null, 
    email: null, 
    message: null
  });
  const [error, setError] = useState(null);

  const handleChange = ({ target: {name, value} }) => {
    setError(null);
    if(!value) {
      setErrors({
        ...errors,
        [name]: 'Field is required'
      })
    } else {
      setErrors({
        ...errors,
        [name]: null
      })
    }

    if(name === 'email' && value) {
      const isValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);

      if(!isValid) {
        setErrors({
          ...errors,
          email: 'Invalid email address'
        })
      }
    }

    const formDataCopy = {...formData};
    formDataCopy[name] = value;

    setFormData(formDataCopy);
  }

  const handleSend = () => {
    const issetValidationErrors = !Object.values(errors).every((value) => !value);
    const allFieldsFilled = !Object.values(formData).some((value) => value === '');

    if(!issetValidationErrors && allFieldsFilled) {
      fetch(`http://localhost:3001/form`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'Application/json'
        }
      })
      .then(async (response) => {
        const res = await response.json();

        if(response.status >= 400 && response.status < 600) {
          if(res.error) {
            throw res.error;
          }
          else {
            throw new Error('Something went wrong!');
          }
        }

        setFormData({
          name: '', 
          email: '', 
          message: ''
        })
        setError(null);
      })
      .catch((error) => {
        console.log('error', error)
      })
    } else {
      setError('Fill in the fields with valid data');
    }
  }

  return (
    <div className='w-50 mx-auto mt-3 text-center'>
      <h2>Contact Us</h2>
      <FormControl
        type="text" 
        value={formData.name}
        name='name'
        onChange={handleChange}
        placeholder='Name'
        className={errors.name ? styles.redBorder : ''}
      />
      <p className='text-danger mt-2 text-start'>{errors.name}</p>

      <FormControl
        type="text" 
        value={formData.email}
        name='email'
        onChange={handleChange}
        placeholder='Email'
        className={errors.email ? styles.redBorder : ''}
      />
      <p className='text-danger mt-2 text-start'>{errors.email}</p>

      <FormControl 
        as="textarea" 
        value={formData.message}
        name='message'
        onChange={handleChange}
        placeholder='Message'
        rows={3} 
        className={errors.message ? styles.redBorder : ''}
      />
      <p className='text-danger mt-2 text-start'>{error ? error : errors.message}</p>

      <Button
          onClick={handleSend}
          variant="primary"
      >
          Send
      </Button>
    </div>
  )
}

export default Contact