// src/componentes/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Login.css'; // importar los estilos

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar el inicio de sesión
        console.log('Usuario:', usuario);
        console.log('Password:', password);
        navigate('/home'); // Redirige a la página de inicio
    };

    return (
        <div className="container">
            <div className="login">
                <h2>Bienvenido</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
