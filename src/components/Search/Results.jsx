import React, { useEffect, useState } from 'react';
import { Card } from '../../components'
import { searchRecipes } from '../../helper';
import { useSearchParams, useNavigate } from 'react-router-dom';


const Results = () => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();  // eslint-disable-line
    const keyword = searchParams.get('');

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        searchRecipes(keyword)
            .then((response) => {
                setRecipes(response)
                setLoading(false)
            })
    }, [setRecipes])

    if (loading) {
        return (
            <h1>Buscando Informacion</h1>
        )
    }
    if (recipes.length <= 0) {
        return (
            <div>
                <h1>No se encontraron resultados</h1>
                <button onClick={() => navigate('/')} className='btn btn-primary'>Volver</button>
            </div>
        )
    }
    return (
        recipes && (
            <div className='row'>
                {
                    recipes.map(recipe => (
                        <Card data={recipe} />
                    ))
                }
                <button onClick={() => navigate('/')} className='btn btn-primary' style={{ marginBottom:'1rem' }}>Volver</button>
            </div>
        )
    )
}

export default Results