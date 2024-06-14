// src/componentes/Home/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="home">
                <h2>Bienvenido RINPA</h2>
                <p>Tratamiento de agua</p>
                <button onClick={() => navigate('/registrarEntrega')}>Registrar Entrega</button>
                <button onClick={() => navigate('/agendarCliente')}>Agendar Cliente</button>
                <button onClick={() => navigate('/agregarProducto')}>Agregar Producto</button>
            </div>
        </div>
    );
};

export default Home;
