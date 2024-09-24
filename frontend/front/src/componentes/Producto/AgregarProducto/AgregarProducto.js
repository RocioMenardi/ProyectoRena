// src/componentes/AgregarProducto.js
import React,{useEffect, useState} from 'react';
import './AgregarProducto.css';
import '../../Login/Login.css';
import '../../Home/Home.css';
import { Link } from 'react-router-dom'; // Importar useNavigate
import Url from '../../../utils/url';
import { Alert } from '@mui/material';

const AgregarProducto = () => {
    const [tipoProducto, setTipoProducto] =  useState([]);
    const [litros, setLitros] =  useState([]);
    const [costo, setCosto] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [selectedTipoProducto, setSelectedTipoProducto] = useState('');
    const [selectedLitros, setSelectedLitros] = useState('');

    // Tipo Producto
    useEffect(() => {
        fetch(`${Url}/producto/tipoProducto/`)

        .then(res=>res.json())
        .then(respuesta => {
            setTipoProducto(respuesta.TiposProducto);
        })
        .catch(error=> console.error("error", error))
        
    },[])
    
    // Litros
    useEffect(() => {
        fetch(`${Url}/producto/litro/`)

        .then(res=>res.json())
        .then(respuesta => {
        setLitros(respuesta.Litros);
        })
        .catch(error=> console.error("error", error))
    },[])


    const handlePost = async (e) => {
        e.preventDefault();
        const costoFloat = parseFloat(costo); // Convertir a flotante
        const precioFloat = parseFloat(precioVenta); // Convertir a flotante
        

        if (isNaN(precioFloat)) {
            alert('Por favor ingresa un valor correcto para el precio.');
            return;
        }
        if (isNaN(costoFloat)) {
            alert('Por favor ingresa un valor correcto para el costo.');
            return;
        }
        if(selectedLitros===""){
            alert("seleccione un litro")
        }
        if(selectedTipoProducto===""){
            alert("seleccione un tipo de producto")
        }
        // Datos a enviar
        const data = {
            tipoProducto: selectedTipoProducto,
            litro: selectedLitros,
            costo: costoFloat,
            precioVenta: precioFloat
            
        };
        
        try {
            const response = await fetch(`${Url}/producto/producto/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                alert("Producto registrado exitosamente")
                // Reseteo los estados a sus valores por defecto (reset del formulario)
                setSelectedTipoProducto("");
                setSelectedLitros("");
                setCosto("");
                setPrecioVenta("");
            } else {

                const errorData = await response.json();
                // Manejar el error, en este caso mostrar un mensaje al usuario
                if (errorData.Error) {
                    alert(errorData.Error);  // Mostrar el mensaje de error del backend
                } else {
                    alert("Hubo un error al agregar el producto.");
                }
                console.error("Hubo un error al agregar el producto:", errorData);
            }
            
        } catch (error) {
            alert(error)
            console.error("Error en la solicitud:", error);
        }
    };


    return (
        <div className="container">
            <div className="pageProducto">
                <button>
                    <Link to="/verProductos" className="back-button">←</Link>    
                </button> 

                <h2>Agregar Producto</h2>

                <form className="login-form" >

                    <div className="form-group">

                        <select type="text" id="tipoProducto" name="tipoProducto" 
                        
                        className="input-field" placeholder='Tipo producto'

                        value={selectedTipoProducto} // Establecer valor seleccionado

                        onChange={(e) => setSelectedTipoProducto(e.target.value)}>

                            <option value="">Seleccione un tipo de producto</option>
                            {tipoProducto.map((tipo, idx) => (
                                <option key={idx} value={tipo.id}>{tipo.nombre}</option>
                            ))}
                        </select>

                    </div>

                    <div className="form-group">
                        <select type="text" id="litros" name="litros" 
                        className="input-field" placeholder='Litros'
                        value={selectedLitros} // Establecer valor seleccionado
                        onChange={(e) => setSelectedLitros(e.target.value)}>
                           
                            <option value="">Seleccione los litros</option>
                            {litros.map((litro, idx) => (
                                <option key={idx} value={litro.id}>{litro.litro} L</option>
                            ))}

                        </select>

                    </div>

                    <div className="form-group">
                        <input type="text" id="costo" name="costo" 
                        className="input-field" placeholder="Costo"
                        value={costo}
                        onChange={(e) => setCosto(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <input type="text" id="precioVenta" name="precioVenta" 
                        className="input-field" placeholder='Precio venta'
                        value={precioVenta}
                        onChange={(e) => setPrecioVenta(e.target.value)}/>
                    </div>

                    <button type="submit" className="submit-button" onClick={handlePost}>Agregar Producto</button>
                </form>

            </div>
        </div>

    );
};

export default AgregarProducto;
