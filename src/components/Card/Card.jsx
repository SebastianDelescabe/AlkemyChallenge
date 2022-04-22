import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ data, deleteRecipe }) => {

    return (
        <div className='col-3'>
            <div className="my-4 card">
                <Link to={`/detail?recipeId=${data.id}`}>
                    <img src={data.image} width={305} height={300} alt="Not Found" />
                </Link>
                <div className="card-body">
                    <h3 className="card-title m2">{data.title.substring(0, 30)}...</h3>
                    {
                        data.vegetarian ? <p className='my-3'><em>Plato vegetariano</em></p> : <p className='my-3'><em>Plato carnivoro</em></p>
                    }
                    <span role="img" aria-label="x" className='delete-btn' onClick={() => deleteRecipe(data.id)}>❌</span>
                    <Link to={`/detail?recipeId=${data.id}`} className=" btn btn-primary">Detalles</Link>
                </div>
            </div>
        </div>
    )
}

export default Card