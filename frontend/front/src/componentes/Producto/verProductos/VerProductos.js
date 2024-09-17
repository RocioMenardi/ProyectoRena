import React,{useEffect, useState} from 'react'
import './verProductos.css'
import { useNavigate } from 'react-router-dom';


const VerProductos = () => {

    const [productos, setProductos] =  useState([]); // Estado para almacenar las entregas
    const navigate = useNavigate();

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    useEffect(() => {
    fetch("http://127.0.0.1:8000/producto/producto/")
    .then(res=>res.json())
    .then(respuesta => {
        setProductos(respuesta.Productos);
        console.log(respuesta)
    })
    .catch(error=> console.error("error", error))
    
},[])

    return(
        <div className="container">

           <div className='contenedorProductos'>

                <button className="back-buttonNafta" onClick={() => navigate('/home')}>←</button> 

                {isMobileDevice() && <button onClick={() => navigate('/agregarProducto')} className='buttonEntrega'>Registrar Producto</button>}
                    <h1>Productos</h1>
                {productos.map((producto, index) => (
                        <div className="contProducto" key={index}>

                            <p>{producto.tipoProducto}  {producto.litro}L</p>
                            <ul>
                                <li><strong>Creacion:</strong> {producto.fechaCreacion}</li>
                                <li><strong>Costo:</strong> ${producto.costo}</li>
                                <li><strong>Precio venta:</strong> ${producto.precioVenta}</li>

                            </ul>
                        </div>
                        ))}
           </div>
           {isMobileDevice()===false && <button onClick={() => navigate('/agregarProducto')} className='button'>Registrar Producto</button>}
        </div>
    )
};

export default VerProductos