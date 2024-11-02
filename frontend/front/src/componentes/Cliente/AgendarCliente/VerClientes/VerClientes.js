import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Url from '../../../utils/url';
import Delete from './EliminarModalCliente';

const VerClientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    //GET
    useEffect(() => {
        fetch(`${Url}/cliente/cliente/`)
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
            ciente.id === updatedClient.id ? updatedClient : cliente
        );
          // Actualizar los estados con la nueva lista
        setClientes(updatedClientes);
        setFilteredClientes(updatedClientes);
        };
};