import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const Search = () => {

  const navigate = useNavigate()

  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value)
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input.length <= 2) {
      swal("Error al buscar", "Ingresar mas de dos caracteres", "warning");
    } else {
      navigate(`/results?=${input}`)
    }
  }

  return (
    <from className='d-flex aling-items-center'>
      <label>
        <input
          onChange={handleInputChange}
          className="form-control"
          placeholder='Buscar platos'
          type='text'
        />
      </label>
      <button onClick={handleOnSubmit} className='btn btn-success' type="sumbit" style={{ marginRight: 10 }}>Buscar</button>
    </from>
  )
}

export default Search