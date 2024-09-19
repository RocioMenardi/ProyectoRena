import React, { useState, useEffect } from 'react';
import './listaNafta.css';
import { useNavigate } from 'react-router-dom';
import Url from '../../../utils/url';


const ListaNafta =() =>{
    const [precios, setPrecios] =  useState([]); // Estado para almacenar las entregas
    const navigate = useNavigate();
    useEffect(() => {
    fetch(`${Url}/entrega/nafta/`)
    .then(res=>res.json())
    .then(respuesta => {
        setPrecios(respuesta.Precio_litro);
    })
    .catch(error=> console.error("error", error))
    
},[])

    return(
        <div className="container">
            <div className="contGeneralInfoPrecioNafta">

                <button className="back-buttonNafta" onClick={() => navigate(-1)}>←</button> 
                
                <h1>Nafta</h1>
                
               {precios.map((precio, index) => (

                    <div className="contInfoPrecioNafta" key={index}>

                        <ul>
                            <li><strong>Precio:</strong> {precio.precio_litro}</li>
                            <li><strong>Fecha:</strong> {precio.fecha}</li>
                        </ul>
                    </div>
 
               ))}
            
            </div> 
            <button onClick={() => navigate('/precioNafta')} className='button'>Nuevo Precio</button>
        </div>
    )
};
export default ListaNafta;