import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getInfo } from '../../helper/getInfo'
import { handleHealtScore, handleRedyIn, handleTotalPrice } from '../../helper/logicPriceHealtMinutes';
import { logout } from '../../helper/logout';
import Card from '../Card/Card';
import swal from 'sweetalert';

const Home = () => {

  const token = sessionStorage.getItem('token');
  const recipesInLocal = localStorage.getItem('recipes'); //traigo los platos guardados en localStorage
  let recipes = JSON.parse(recipesInLocal);
  if (!recipes) {  //Si no hay nada guardado(porque es la primera vez que el usuario ingresa) lo inicializo en un array vacio para que el useEffect no de error
    recipes = [];
  }

  const [menuRecipes, setMenuRecipes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {

    if (recipes.length === 0) { //Si lo que traigo del localStorage esta vacio, lo "cargo con la funcion getInfo"
      getInfo()
        .then((response) => {
          localStorage.setItem('recipes', JSON.stringify(response)); //Guardo la respuesta para que perdure en el localStorage y no tener que volver a hacer peticiones 
          setMenuRecipes(response); //Guardo respuesta en estado de React para poder leer y modificar la informacion
          setError(false);
        })
        .catch((error) => {
          swal("Error al cargar informacion", "Problemas con la API", "error");
          setError(true);
          console.log(error);
        })

    } else {
      setMenuRecipes(recipes); //Guardo lo que ya existe en localStorage dentro del estado, permitiendome modifcar la informacion en pantalla
    }

  }, [recipes.length]);//Esta atento al recipes.length para cuando no haya ningun plato en pantalla, se vuelva a cargar la informacion


  const deleteRecipe = (id) => {  //Trae el id del plato clickeado 
    const filterData = menuRecipes.filter(recipe => recipe.id !== id); //Guardo en un arreglo todos los platos distintos al del id clickeado para eliminar
    localStorage.setItem('recipes', JSON.stringify(filterData)); //Guardo los cambios en localStorage para que perduren al recargar o cambiar de página
    return setMenuRecipes(filterData);  ////Guardo los cambios en el estado para poder visualizarlo en pantalla
  }

  if (error) {
    return (
      <>
        <h3 className='alert alert-danger text-center container-sm'>Error al cargar la informacion, disculpe la molestia</h3>
        <button className='btn btn-danger' onClick={logout}>Cerrar sesion</button>
      </>
    )
  }
  return (
    <div className=' animate__animated animate__fadeIn'>
      {!token && <Navigate to='/' />}
      <h1 className='mt-5 d-flex justify-content-center'>Menu</h1>
      <div className=' mt-5 d-flex justify-content-around '>
        <h5 >Precio del menú: $ {handleTotalPrice(menuRecipes)}</h5>
        <h5 >Preparación: {handleRedyIn(menuRecipes)} Minutos</h5>
        <h5 >HealScore: {handleHealtScore(menuRecipes)}</h5>
      </div>

      <div className='row'>
        {
          menuRecipes && menuRecipes.map((recipe) => (
            <Card key={recipe.id} deleteRecipe={deleteRecipe} data={recipe} />
          ))
        }
      </div>
      <button onClick={logout} className='btn btn-danger'>Cerrar sesion</button>
    </div>
  )
}

export default Home