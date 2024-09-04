import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Home.css';
import logo from '../../imagenes/logo.jpeg'

const Home = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="home">
                <div className="header">
                    {user && <div className="user-info">Bienvenido, {user}</div>}
                </div> 
                <img src={logo} alt="Logo" className='logo'></img>
                <button onClick={() => navigate('/registrarEntrega')}>Registrar Entrega</button>
                <button onClick={() => navigate('/agendarCliente')}>Agendar Cliente</button>
                <button onClick={() => navigate('/agregarProducto')}>Agregar Producto</button>
                <button onClick={() => navigate('/precioNafta')}>Precio Nafta</button>
            </div>
        </div>
    );
};

export default Home;
