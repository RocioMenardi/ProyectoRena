// src/componentes/RegistrarEntrega.js
import React, {useEffect, useState} from 'react';
import './RegistrarEntrega.css';
import { useNavigate,Link } from 'react-router-dom';
import InputBuscador from '../ComponentesPrueba/InputBuscador';
import Url from '../../utils/url';
import SelectProducto from './selectProductos';

const RegistrarEntrega = () => {
    const[clientes, setClientes] = useState([''])
    const[productos, setProductos] = useState([''])
    const[productoSelect, setProductoSelect]= useState(null)
    const[clienteSelect, setClienteSelect]= useState(null)
    const [formData, setFormData] = useState({
        cliente: '',
        nafta: '',
        usuario: '',
        fechaHora: '',
    });
    const navigate = useNavigate();

    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Captura la fecha y hora actuales
        const fechaHoraActual = new Date().toLocaleString(); // Formato local de fecha y hora
        setFormData({ ...formData, fechaHora: fechaHoraActual });

        // Aquí podrías manejar el envío de datos al servidor o a la base de datos
        console.log('Datos de la entrega:', { ...formData, fechaHora: fechaHoraActual });

        // Resetea el formulario o navega a otra página según lo necesites
    };

    useEffect(() => {
        fetch(`${Url}/producto/producto/`)
        .then((res) => res.json())
        .then((respuesta) => {
            setProductos(respuesta.Productos)
          })
          .catch((error) => console.error("Error fetching data:", error));
    },[]);
    
    useEffect(() => {
        fetch(`${Url}/entrega/cliente/`)
        .then((res) => res.json())
        .then((respuesta) => {
            setClientes(respuesta.Clientes)
          })
          .catch((error) => console.error("Error fetching data:", error));
    },[]);
    
    const setearIdProducto= (id) =>{
        setProductoSelect(id)
    }
    const setearIdCliente= (id) =>{
        setProductoSelect(id)
    }

    return (
        <div className="container">
            <div className="pageProducto">
                <button>
                    <Link to="/home" className="back-button">←</Link>    
                </button> 

                <h2>Agregar Entrega</h2>

                <form className="login-form" >

                    <div className="form-group">
                        <p>Clientes</p>
                        <InputBuscador lista={clientes} setId={setearIdCliente}></InputBuscador>
                    </div>

                    <div className="form-group">
                        <SelectProducto lista={productos}></SelectProducto>
                    </div>

                    <div className="form-group">
                        <input type="text" id="costo" name="costo" 
                        className="input-field" placeholder="Costo"
                        // value={costo}
                        // onChange={(e) => setCosto(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input type="text" id="precioVenta" name="precioVenta" 
                        className="input-field" placeholder='Precio venta'
                        // value={precioVenta}
                        // onChange={(e) => setPrecioVenta(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-button" >Agregar Entrega</button> 
                    {/* onClick={handlePost} */}
                </form>

            </div>
        </div>
    );
};

export default RegistrarEntrega;
