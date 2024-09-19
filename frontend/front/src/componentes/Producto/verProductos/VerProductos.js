import React,{useEffect, useState} from 'react'
import './verProductos.css'
import { useNavigate } from 'react-router-dom';
import Buscador from '../../buscador/buscador';
import Delete from './EliminarModal';
import Put from './EditarModal';


const VerProductos = () => {

    const [productos, setProductos] =  useState([]); // Estado para almacenar las entregas
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProductos, setFilteredProductos] = useState([]);
    
    

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    //GET
    useEffect(() => {
    fetch("http://127.0.0.1:8000/producto/producto/")
    .then(res=>res.json())
    .then(respuesta => {
        setProductos(respuesta.Productos);
        setFilteredProductos(respuesta.Productos);
        console.log(respuesta)
    })
    .catch(error=> console.error("error", error))
    },[])

    //BUSCADOR
    useEffect(() => {
        // Filtrar los libros en función del término de búsqueda
        setFilteredProductos(productos.filter((item) =>
          item.tipoProducto.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      }, [searchTerm]);
    
      const handleSearchChange = (term) => {
        setSearchTerm(term);
      };
     
    const handleProductDelete = (id) => {
        const updatedProductos = productos.filter((producto) => producto.id !== id);
        setProductos(updatedProductos);
        setFilteredProductos(updatedProductos);
      };

    const handleProductUpdate = (updatedProduct) => {
        // Actualizar el producto en la lista de productos
        const updatedProductos = productos.map((producto) =>
          producto.id === updatedProduct.id ? updatedProduct : producto
        );
        // Actualizar los estados con la nueva lista
        setProductos(updatedProductos);
        setFilteredProductos(updatedProductos);
      };
    
    return(
        <div className="container">

           <div className='contenedorProductos'>

                <button className="back-buttonNafta" onClick={() => navigate('/home')}>←</button> 

                {isMobileDevice() && <button onClick={() => navigate('/agregarProducto')} className='buttonEntrega'>Registrar Producto</button>}

                <h1>Productos</h1>
                <Buscador onSearch={handleSearchChange} />
                {filteredProductos.map((producto, index) => (
                        <div className="contProducto" key={index}>

                            <p>{producto.tipoProducto}  {producto.litro}L</p>
                            <ul>
                                <li><strong>Creacion:</strong> {producto.fechaCreacion}</li>
                                <li><strong>Costo:</strong> ${producto.costo}</li>
                                <li><strong>Precio venta:</strong> ${producto.precioVenta}</li>

                            </ul>
                            <div className='contBotones'>
                                <Delete id={producto.id} onDelete={handleProductDelete}> 
                                </Delete>
                                <Put producto={producto} id={producto.id} productUpdate={handleProductUpdate}></Put>
                            </div>
                            
                        </div>
                        
                        ))}
           </div>
           {isMobileDevice()===false && <button onClick={() => navigate('/agregarProducto')} className='button'>Registrar Producto</button>}
        </div>
    )
};

export default VerProductos