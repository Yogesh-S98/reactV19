import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from './service';
import './Login.css';
import { Card } from 'antd';


function Login() {
    const navigator = useNavigate();
    const formObj = {
      email: '',
      password: ''
    }
    const [formData, setFormData] = useState(formObj);
    const [errors, setErrors] = useState(formObj);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
    const submit = async (e) => {
      e.preventDefault();
      const newErrors = {};
  
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
  
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        const result = await login(formData);
        if (result.data.data.token) {
          localStorage.setItem('userDetails', JSON.stringify(result.data.data.user));
          localStorage.setItem('token', result.data.data.token);
          if (localStorage.getItem('token')) {
            window.location.href = '/home';
          }
        } else {
          setErrors({ email: 'Invalid email or password' });
        }
      }
    }
    return (
      <div className='App-header'>
        <h2>Login</h2>
        <Card size='default'>
            <Form className='form' onSubmit={submit}>
              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  name='email'
                  value={formData.email}
                  isInvalid={!!errors.email}
                  onChange={(e) => handleChange(e)}
                  placeholder='Enter your email' />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password' 
                  value={formData.password} 
                  isInvalid={!!errors.password}
                  onChange={(e) => handleChange(e)}
                  placeholder='Enter your password' />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
              </Form.Group>
              <Button className='mt-3' variant='primary' type='submit'>Submit</Button>
            </Form>
        </Card>
      </div>
    );
}

export default Login;