import React from 'react';
import { useState } from 'react';
import '../../Login/Login.css';
import '../../Home/Home.css';
import './AgendarCliente.css';// Importar los estilos
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Url from '../../../utils/url';

const AgendarCliente = () => {
    const navigate = useNavigate(); // Definir el hook
    
    const [formData, setFormData] = useState({ 
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        descripcion: ''
    });

    // Manejador de cambio para los inputs del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario (recargar la página)
        try {
            const response = await fetch(`${Url}/entrega/cliente/`, { //url del backend
                method: 'POST', //post
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Enviar los datos del formulario como JSON
            });

            if (response.ok) {
                // Si la respuesta es exitosa (código 2xx)
                alert('Cliente agendado con éxito!');
                navigate('/home'); // Redirigir a la página de menú o donde quieras
            } else {
                // Si hay un error en la respuesta del servidor
                alert('Error al agendar cliente');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al conectar con el servidor');
        }
    };

    return (
        <div className="container">
            <div className="page">
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Botón de volver */}
                <h2>Agendar Cliente</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="input-field" 
                        placeholder='Nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="apellido" 
                        name="apellido" 
                        className="input-field" 
                        placeholder='Apellido'
                        value={formData.apellido}
                        onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="direccion" 
                        name="direccion" 
                        className="input-field" 
                        placeholder='Dirección'
                        value={formData.direccion}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="telefono" 
                        name="telefono" 
                        className="input-field" 
                        placeholder='Teléfono'
                        value={formData.telefono}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="text" 
                        id="descripcion" 
                        name="descripcion" 
                        className="input-field" 
                        placeholder='Descripción'
                        value={formData.descripcion}
                        onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">Agendar Cliente</button>
                </form>
            </div>
        </div>
    );
};

export default AgendarCliente;