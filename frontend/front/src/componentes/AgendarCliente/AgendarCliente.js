import React from 'react';
import '../Login/Login.css';
import '../Home/Home.css';
import './AgendarCliente.css';
// Importar los estilos

const AgendarCliente = () => {
    return (
        <div className="container">
            <div className="page">
                <h2>Agendar Cliente</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" className="input-field" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" name="apellido" className="input-field" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="direccion">Dirección:</label>
                        <input type="text" id="direccion" name="direccion" className="input-field" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono:</label>
                        <input type="text" id="telefono" name="telefono" className="input-field" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <input type="text" id="descripcion" name="descripcion" className="input-field" />
                    </div>
                    <button type="submit" className="submit-button">Agendar Cliente</button>
                </form>
            </div>
        </div>
    );
};

export default AgendarCliente;