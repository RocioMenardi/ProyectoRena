import React from 'react';
import './PrecioNafta.css';
import { useNavigate } from 'react-router-dom'; 

const PrecioNafta = () => {
    const navigate = useNavigate(); // Definir el hook
    return(
        <div className='container'>
            <div className='nafta'>
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Botón de volver */}
                <h2>Precio Nafta</h2>
                <form className='precioN-form'>
                    <div className="campo">
                        <input type="text" id="precioN" name="precio" className="input-field" placeholder='$'/>
                    </div>
                </form>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </div>
    );
};

export default PrecioNafta;