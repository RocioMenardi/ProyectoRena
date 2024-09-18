import "./VerEntrega.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonModal from "../botonModal/BotonModal";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const VerEntrega =() =>{
    const [entregas, setEntregas] =  useState([]); // Estado para almacenar las entregas
    const navigate = useNavigate();

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    useEffect(() => {
    fetch("http://127.0.0.1:8000/entrega/entrega/")
    .then(res=>res.json())
    .then(respuesta => {
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
                            <li><strong>Fecha:</strong> {entrega.fecha} : {entrega.hora}hs</li>
                            <li><strong>Cliente:</strong> {entrega.cliente}</li>
                            <li><strong>Monto total:</strong> ${entrega.Total}</li>
            
                        </ul>
                        <div className='contBotonesEntrega'>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                        <BotonModal entrega={entrega}></BotonModal>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                        </div>
                    </div>
               ))}
            
            </div>
            {isMobileDevice()===false && <button onClick={() => navigate('/registrarEntrega')} className='button'>Registrar Entrega</button>} 
        </div>
    )
};
export default VerEntrega