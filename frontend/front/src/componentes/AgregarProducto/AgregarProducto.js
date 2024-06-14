// src/componentes/AgregarProducto.js
import React from 'react';
import './AgregarProducto.css';
import '../Login/Login.css';
import '../Home/Home.css';

const AgregarProducto = () => {
    return (
        <div className="container">
            <div className="pageProducto">
                <h2>Agregar Producto</h2>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="tipoProducto">Tipo Producto:</label>
                        <input type="text" id="tipoProducto" name="tipoProducto" className="input-field" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="litros">Litros:</label>
                        <input type="text" id="litros" name="litros" className="input-field" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="costo">Costo:</label>
                        <input type="text" id="costo" name="costo" className="input-field" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="precioVenta">Precio Venta:</label>
                        <input type="text" id="precioVenta" name="precioVenta" className="input-field" />
                    </div>
                    <button type="submit" className="submit-button">Agregar Nuevo Producto</button>
                </form>

            </div>
        </div>

    );
};

export default AgregarProducto;
