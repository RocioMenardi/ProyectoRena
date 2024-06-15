// src/componentes/Login/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const { setUser } = useContext(UserContext);  // Asegúrate de importar useContext
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setUser(username);  // Guardar el nombre de usuario en el contexto
        navigate('/home');
    };

    return (
        <div className="container">
            <div className="login">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
