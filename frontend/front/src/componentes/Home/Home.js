import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Home.css';
// import logo from '../../imagenes/logo.jpeg'

const Home = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const User = user

    return (
        <div className="container">
            <div className="home">
                <div className="header">
                    {User && <div className="user-info">Bienvenido, {User}</div>}
                </div> 

                <div className='logo2'></div>

                <button onClick={() => navigate('/verEntrega')}>Ver Entregas</button>
                <button onClick={() => navigate('/registrarEntrega')}>Registrar Entrega</button>
                <button onClick={() => navigate('/agendarCliente')}>Agendar Cliente</button>
                <button onClick={() => navigate('/verProductos')}>Ver Productos</button>
                <button onClick={() => navigate('/listaNafta')}>Nafta</button>
            </div>
        </div>
    );
};

export default Home;
