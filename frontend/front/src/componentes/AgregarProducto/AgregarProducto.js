// src/componentes/AgregarProducto.js
import React from 'react';
import './AgregarProducto.css';
import '../Login/Login.css';
import '../Home/Home.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const AgregarProducto = () => {
    const navigate = useNavigate(); // Definir el hook
    return (
        <div className="container">
            <div className="pageProducto">
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Botón de volver */}
                <h2>Agregar Producto</h2>
                <form className="login-form">
                    <div className="form-group">
                        <select type="text" id="tipoProducto" name="tipoProducto" className="input-field" placeholder='Tipo producto'>
                            <option value="aguaDestilada">Agua Destilada</option>
                            <option value={"refrigeranteOrg"}>Refrigerante Orgánico</option>
                            <option value={"refrigeranteIn"}>Refrigerante Inorgánico</option>
                            <option value={"bidon"}>Bidón</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <select type="text" id="litros" name="litros" className="input-field" placeholder='Litros'>
                            <option value={"5"}>5 L</option>
                            <option value={"10"}>10 L</option>
                            <option value={"15"}>15 L</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <input type="text" id="costo" name="costo" className="input-field" placeholder="Costo"/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="precioVenta" name="precioVenta" className="input-field" placeholder='Precio venta'/>
                    </div>
                    <button type="submit" className="submit-button">Agregar Producto</button>
                </form>

            </div>
        </div>

    );
};

export default AgregarProducto;
