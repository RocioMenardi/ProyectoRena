// src/componentes/RegistrarEntrega.js
import React, {useState} from 'react';
import './RegistrarEntrega.css';
import { useNavigate,Link } from 'react-router-dom';

const RegistrarEntrega = () => {

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

    return (
        <div className="container">
            <div className="pageProducto">
                <button>
                    <Link to="/home" className="back-button">←</Link>    
                </button> 

                <h2>Agregar Entrega</h2>

                <form className="login-form" >

                    <div className="form-group">

                        <select type="text" id="tipoProducto" name="tipoProducto" 
                        className="input-field" placeholder='Tipo producto'

                        // value={selectedTipoProducto} // Establecer valor seleccionado

                        // onChange={(e) => setSelectedTipoProducto(e.target.value)}
                        >

                            {/* <option value="">Seleccione un tipo de producto</option>
                            {tipoProducto.map((tipo, idx) => (
                                <option key={idx} value={tipo.id}>{tipo.nombre}</option>
                            ))} */}
                        </select>

                    </div>

                    <div className="form-group">
                        <select type="text" id="litros" name="litros" 
                        className="input-field" placeholder='Litros'
                        // value={selectedLitros} // Establecer valor seleccionado
                        // onChange={(e) => setSelectedLitros(e.target.value)}
                        >
                           
                            {/* <option value="">Seleccione los litros</option>
                            {litros.map((litro, idx) => (
                                <option key={idx} value={litro.id}>{litro.litro} L</option>
                            ))} */}

                        </select>

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
