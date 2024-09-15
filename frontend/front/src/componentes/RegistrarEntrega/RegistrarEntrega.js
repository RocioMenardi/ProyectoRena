// src/componentes/RegistrarEntrega.js
import React, {useState} from 'react';
import './RegistrarEntrega.css';
import { useNavigate } from 'react-router-dom';

const RegistrarEntrega = () => {
    const [formData, setFormData] = useState({
        cliente: '',
        nafta: '',
        usuario: '',
        fechaHora: '',
    });
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Captura la fecha y hora actuales
        const fechaHoraActual = new Date().toLocaleString(); // Formato local de fecha y hora
        setFormData({ ...formData, fechaHora: fechaHoraActual });

        // Aquí podrías manejar el envío de datos al servidor o a la base de datos
        console.log('Datos de la entrega:', { ...formData, fechaHora: fechaHoraActual });

        // Resetea el formulario o navega a otra página según lo necesites
    };

    return (
        <div className="container">
            <div className="page">
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Botón de volver */}
                <h2>Registrar Entrega</h2>
                <form className="login-form">

                    <div className='form-group'> 
                        <input type="text" id="nombre" name="nombre" className="input-field" placeholder='Nombre Cliente'/>
                    </div>

                    <div className='form-group'> 
                        <input type="text" id="nafta" name="nafta" className="input-field" placeholder='Nafta $'/>
                    </div>
                    
                    <div className='submit'>
                        <button type='submit' className="submit-button">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrarEntrega;
