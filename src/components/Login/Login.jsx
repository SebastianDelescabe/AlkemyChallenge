import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(false) //Manejo disabled del boton login

  const [input, setInput] = useState({
    username: 'challenge@alkemy.org',
    password: 'react',
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault(e);

    if (input.username === '' || input.password === '') {
      swal("Error al ingresar", "Completar formulario correctamente", "error");
      return;

    } else if (input.username === 'challenge@alkemy.org' && input.password === 'react') {
      setDisabled(true);

      setTimeout(async () => {
        await axios.post('http://challenge-react.alkemy.org/', { email: input.username, password: input.password })
          .then((response) => {
            const token = response.data.token;
            sessionStorage.setItem('token', token)
            swal("Credenciales validas", "Ingreso correctamente", "success");
            navigate('/home');
          })
          .catch((error) => {
            swal("Error al ingresar", "Problemas con servidor", "error");
            console.log(error)
          });
        setDisabled(false)
        return;
      }, 500);

    } else {
      swal("Error al ingresar", "Credenciales invalidas", "error");
      return;
    }
  }

  const token = sessionStorage.getItem('token');

  return (
    <>
      {token && <Navigate to='/home' />}
      <div className='col-5 offset-3 mt-5 card p-5'>
        <h1>Formulario de ingreso</h1>
        <form onSubmit={handleSubmit}>
          <label className='form-label d-block mt-2'>
            <span>Correo Electronico:</span><br />
            <input
              type="text"
              name='username'
              value={input.username}
              className='form-control'
              onChange={handleInputChange} />
          </label>
          <br />
          <label className='form-label d-block mt-2'>
            <span>Contraseña:</span><br />
            <input
              type="password"
              name='password'
              value={input.password}
              className='form-control'
              onChange={handleInputChange} />
          </label>
          <br />
          <button type='submit' className='btn btn-success mt-2' disabled={disabled} >Enviar</button>
        </form>
      </div>
    </>
  )
}

export default Login