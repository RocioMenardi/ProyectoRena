import React from 'react';
import '../Login/Login.css';
import '../Home/Home.css';
import './AgendarCliente.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
// Importar los estilos

const AgendarCliente = () => {
    const navigate = useNavigate(); // Definir el hook
    return (
        <div className="container">
            <div className="page">
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Botón de volver */}
                <h2>Agendar Cliente</h2>
                <form className="login-form">
                    <div className="form-group">
                        <input type="text" id="nombre" name="nombre" className="input-field" placeholder='Nombre'/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="apellido" name="apellido" className="input-field" placeholder='Apellido' />
                    </div>
                    <div className="form-group">
                        <input type="text" id="direccion" name="direccion" className="input-field" placeholder='Dirección'/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="telefono" name="telefono" className="input-field" placeholder='Teléfono'/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="descripcion" name="descripcion" className="input-field" placeholder='Dirección'/>
                    </div>
                    <button type="submit" className="submit-button">Agendar Cliente</button>
                </form>
            </div>
        </div>
    );
};

export default AgendarCliente;