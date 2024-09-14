import "./VerEntrega.css";
import React, { useState, useEffect } from 'react';




const VerEntrega =() =>{
    const [entregas, setEntregas] =  useState([]); // Estado para almacenar las entregas

    useEffect(() => {
<<<<<<< HEAD
    fetch("http://127.0.0.1:8000/entrega/entrega/")
    .then(res=>res.json())
    .then(respuesta => {
        console.log(respuesta); // Verifica la respuesta aquí
        setEntregas(respuesta.Entregas);
    })
    .catch(error=> console.error("error", error))
    
},[])

=======
    
        fetch("http://127.0.0.1:8000/entrega/entrega/")
        .then(res=>res.json())
        .then(respuesta => {
            // Verifica la respuesta aquí
            setEntregas(respuesta.entregas || []);
        })
        .catch(error=> console.error("error", error)) 
    },[])

    console.log("Estado de entregas:", entregas);
>>>>>>> 2cc9c6f36f9823083d9f019a4d160f371962aaff
    return(
        <div className="container">
            <div className="contGeneralInfo">
                <h1>Entregas</h1>
            
               {entregas.map((entrega, index) => (

                    <div className="contInfo" key={index}>

                        <ul>
                            <li><strong>Fecha:</strong> {entrega.fecha}</li>
                            <li><strong>Hora:</strong> {entrega.hora}</li>
                            <li><strong>Cliente:</strong> {entrega.cliente}</li>
                            <li><strong>Nafta (Precio por Litro):</strong> {entrega.nafta}</li>
                            <li><strong>Usuario:</strong> {entrega.usuario}</li>
                        </ul>
                    </div>
               ))}
            
            </div> 
        </div>
    )
};
export default VerEntrega