import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Home.css';

const Home = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="home">
                <div className="header">
                    {user && <div className="user-info">Bienvenido, {user}</div>}
                </div>
                <h2>RINPA</h2>
                <p>Tratamiento de agua</p>
                <button onClick={() => navigate('/registrarEntrega')}>Registrar Entrega</button>
                <button onClick={() => navigate('/agendarCliente')}>Agendar Cliente</button>
                <button onClick={() => navigate('/agregarProducto')}>Agregar Producto</button>
            </div>
        </div>
    );
};

export default Home;
