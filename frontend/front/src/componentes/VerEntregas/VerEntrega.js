import "./VerEntrega.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const VerEntrega =() =>{
    const [entregas, setEntregas] =  useState([]); // Estado para almacenar las entregas
    const navigate = useNavigate();

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    useEffect(() => {
        console.log(isMobileDevice())
    fetch("http://127.0.0.1:8000/entrega/entrega/")
    .then(res=>res.json())
    .then(respuesta => {
        console.log(respuesta.Entregas)
        setEntregas(respuesta.Entregas);
    })
    .catch(error=> console.error("error", error))
    
},[])

    return(
        <div className="container">
            <div className="contGeneralInfo">

                <button className="back-buttonNafta" onClick={() => navigate(-1)}>←</button> 

                {isMobileDevice() && <button onClick={() => navigate('/registrarEntrega')} className='buttonEntrega'>Registrar Entrega</button>} 

                <h1>Entregas</h1>
                

               {entregas.map((entrega, index) => (

                    <div className="contInfo" key={index}>

                        <ul>
                            <li><strong>Usuario:</strong> {entrega.usuario}</li>
                            <li><strong>Fecha:</strong> {entrega.hora}hs : {entrega.fecha}</li>
                            <li><strong>Cliente:</strong> {entrega.cliente}</li>
                            <li><strong>Monto total:</strong> ${entrega.Total}</li>
                            <li><strong>Nafta (Precio por Litro):</strong> {entrega.nafta}</li>
                            {entrega.productos.map((producto,idx)=>(
                                <li key={idx}><strong>Producto:</strong> {producto.nombre} : {producto.cantidad}L</li>
                            ))}
                        </ul>
                    </div>
               ))}
            
            </div>
            {isMobileDevice()===false && <button onClick={() => navigate('/registrarEntrega')} className='button'>Registrar Entrega</button>} 
        </div>
    )
};
export default VerEntrega