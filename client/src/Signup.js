import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const Signup = ({ login }) => {
  const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    // '/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i'
 );

 const validPass = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'
 )
 const validName = new RegExp(
  '^[A-Za-z]+$'
 )
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const [name, email, username, password] = [
      'name',
      'email',
      'username',
      'password',
    ].map((field) => formData.get(field));
   let role=1;
    if(!validEmail.test(email)){
      setError("Invalid Email ID");
    }
    else if(!validPass.test(password))
    {
      setError("Password must contain atleast 8 characters (1 Uppercase,1 Lowercase, 1 Special Character)");
    }
    else if(!validName.test(name)){
      setError("Only Letters Allowed in Name")
    }
    else{
      axios
        .post(`http://localhost:5000/api/v1/users`, {
          name,
          email,
          username,
          password,
          previous_login: new Date(),
          role
        })
        .then((res) => {
          setSuccess(true);
          login(res.data.user);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          setSuccess(false);
        });
     }
  };

  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Create Account</h1>
      <Form style={{ width: '30rem' }} onSubmit={handleSubmit}>
      {error && <Form.Text style={{ color: 'red' }}>
          {error}
        </Form.Text>}
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            name='name'
            onClick={() => setSuccess(null)}
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter email'
            name='email'
            onClick={() => setSuccess(null)}
            autoComplete='off'
          />
          <Form.Text className='text-muted'>
            Personal information will not be shared with external sources
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            name='username'
            onClick={() => setSuccess(null)}
            autoComplete='off'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            onClick={() => setSuccess(null)}
          />
          {success === null ? (
            <Form.Text>
              Please use a password different from the one you use for email
            </Form.Text>
          ) : success ? (
            <Form.Text style={{ color: 'green' }}>
              Successful - Account Created
            </Form.Text>
          ) : (
            <Form.Text style={{ color: 'red' }}>
              No spaces allowed in username and password. Username may already
              exist.
            </Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
       
      </Form>
    </div>
  );
};

export default Signup;
