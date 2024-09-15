import React,{useState} from 'react';
import './PrecioNafta.css';
import { useNavigate } from 'react-router-dom'; 

const PrecioNafta = () => {
    
    const navigate = useNavigate(); // Definir el hook
    const [precio, setPrecio] = useState('');

    const handleInputChange = (e) => {
        setPrecio(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar que se recargue la página
        const precioFloat = parseFloat(precio); // Convertir a flotante

        if (isNaN(precioFloat)) {
            alert('Por favor ingresa un valor correcto.');
            return;
        }
        
        try {
            const response = await fetch('http://127.0.0.1:8000/entrega/nafta/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ precio_litro: precioFloat }) // Enviar el precio como flotante
            });

            const data = await response.json();

            if (response.ok) {
                navigate(-1); // Volver atrás después de guardar
            } else {
                alert(data.Error || 'Error al guardar el precio')
            }
        } catch (error) {
            console.error('Error al enviar el precio:', error);
        }
    };

    return(
        <div className='container'>
            <div className='nafta'>
                <button className="back-button" onClick={() => navigate(-1)}>←</button> {/* Botón de volver */}
                <h2>Precio Nafta</h2>
                <form className='precioN-form' onSubmit={handleSubmit}> {/* Asignar handleSubmit al form */}
                    <div className="campo">
                        <input 
                            type="text" 
                            id="precioN" 
                            name="precio" 
                            className="input-field" 
                            placeholder='$' 
                            value={precio} 
                            onChange={handleInputChange} // Manejar el cambio en el input
                        />
                    </div>
                    <button type="submit" className="submit-button">Guardar</button> {/* Botón de guardar */}
                </form>
            </div>
        </div>
    );
};

export default PrecioNafta;