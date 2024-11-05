import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Url from '../../../utils/url';
import Delete from './EliminarModalCliente';
import Put from './PutClientes';
import Buscador from '../../buscador/buscador';
import './VerClientes.css';

const VerClientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    //GET
    useEffect(() => {
        fetch(`${Url}/entrega/cliente/`)
        .then(res=>res.json())
        .then(respuesta => {
            setClientes(respuesta.Clientes);
            setFilteredClientes(respuesta.Clientes);
            console.log(respuesta)
        })
        .catch(error=> console.error("error", error))
        },[])

    //BUSCADOR
    useEffect(() => {
        // Filtrar los clientes en función del término de búsqueda
        setFilteredClientes(clientes.filter((item) =>{

        const nombre = item.nombre ? item.nombre.toLowerCase() : '';
        const apellido = item.apellido ? item.apellido.toString() : '';
        const direccion = item.direccion ? item.direccion.toString() : '';

        return nombre.includes(searchTerm.toLowerCase()) 
        || apellido.includes(searchTerm)
        || direccion.includes(searchTerm) 
        }));

    }, [searchTerm, clientes]);
    
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };
    
    //DELETE
    const handleClientesDelete = (id) => {
        const updatedClientes = clientes.filter((clientes) => clientes.id !== id);
        setClientes(updatedClientes);
        setFilteredClientes(updatedClientes);
    };

    const handleClientUpdate = (updatedClient) => {
        // Actualizar el cliente en la lista de clientes
        const updatedClientes = clientes.map((cliente) =>
            cliente.id === updatedClient.id ? updatedClient : cliente
        );
          // Actualizar los estados con la nueva lista
        setClientes(updatedClientes);
        setFilteredClientes(updatedClientes);
        };

        return(
            <div className="container">
    
            <div className='contenedorClientes'>
    
                    <button className="back-buttonNafta" onClick={() => navigate('/home')}>←</button> 
    
                    {isMobileDevice() && <button onClick={() => navigate('/agendarCliente')} className='buttonEntrega'>Agendar Cliente</button>}
    
                    <h1>Clientes</h1>
                    <Buscador onSearch={handleSearchChange} />
                    {filteredClientes.map((cliente, index) => (
                            <div className="contCliente" key={index}>
    
                                <p>{cliente.nombre}  {cliente.apellido}</p>
                                <ul>
                                    <li><strong>Teléfono:</strong> {cliente.telefono}</li>
                                    <li><strong>Dirección:</strong> {cliente.direccion}</li>
                                    <li><strong>Descripción:</strong>{cliente.descripcion}</li>
    
                                </ul>
                                <div className='contBotones'>
                                    <Delete id={cliente.id} onDelete={handleClientesDelete}> 
                                    </Delete>
                                    <Put cliente={cliente} id={cliente.id} clientUpdate={handleClientUpdate}></Put>
                                </div>
                                
                            </div>
                            
                            ))}
            </div>
            {isMobileDevice()===false && <button onClick={() => navigate('/agendarCliente')} className='button'>Agendar Cliente</button>}
            </div> //Funcion para que se vea en el celu
        )
    };
    
    export default VerClientes