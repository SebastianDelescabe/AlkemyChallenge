import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getInfoById } from '../../helper/getInfoById';
import swalert from 'sweetalert';

const Detail = () => {
    
    const token = sessionStorage.getItem('token')
    let query = new URLSearchParams(window.location.search);
    let recipeID = query.get('recipeId');

    const [detail, setDetail] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        getInfoById(recipeID)
            .then((response) => {
                setDetail(response)
                setLoading(false)
            })
            .catch((error) => {
                swalert("Error al cargar informacion", "Problemas con la API", "error");
                console.log(error)
            })
    }, [])

    const handleOnBack = () => {
        window.history.back();
    }

    if (loading) {
        return (
            <>
                <h1 className='animate__animated  animate__flash'>Cargando...</h1>
            </>
        )
    } else {
        return (
            <>
                {!token && <Navigate to='/' />}
                {detail &&
                    <>
                        <div className='row'>
                            <div className='col-4 animate__animated animate__fadeInLeft animate__delay-0.2s' >
                                <img src={detail.image} style={{height:'550px'}} className='img-fluid my-5' alt='img not found' />
                            </div>
                            <div className='col-8 my-5'>
                                <h1>{detail.title}</h1>
                                <h2 className='mb-5'>{detail.creditsText}</h2>
                                <h5>Datos de interés</h5>
                                <p dangerouslySetInnerHTML={{ __html: detail.summary }} />
                                <h5 className='my-4'>Precio: $ {Math.round(detail.pricePerServing)}</h5>
                                <h5 className='my-4'>Preparacion: {detail.readyInMinutes} minutos</h5>
                                <h5 className='my-4'>Health Score: {detail.healthScore} </h5>
                            </div>
                            <button onClick={handleOnBack} style={{ width: '100%' }} className=" col-4 btn btn-primary animate__animated animate__fadeInUp animate__delay-1s">Volver</button>
                        </div>
                    </>
                }
            </>
        )

    }
}

export default Detail