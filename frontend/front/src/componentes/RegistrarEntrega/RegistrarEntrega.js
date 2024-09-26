// src/componentes/RegistrarEntrega.js
import React, {useEffect, useState} from 'react';
import './RegistrarEntrega.css';
import { useNavigate,Link } from 'react-router-dom';
import InputBuscador from '../ComponentesPrueba/InputBuscador';
import Url from '../../utils/url';


const RegistrarEntrega = () => {
    const[clientes, setClientes] = useState([''])
    const[productos, setProductos] = useState([''])
    const[nafta, setNafta] = useState([''])
    const[productosSeleccionados, setProductosSeleccionados]= useState([])
    const[clienteSelect, setClienteSelect]= useState(null)
    const[naftaSelect, setNaftaSelect]= useState(null)
    const[cantLitros, setCantLitros] = useState([''])
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

    //GET PRODUCTOS
    useEffect(() => {
        fetch(`${Url}/producto/producto/`)
        .then((res) => res.json())
        .then((respuesta) => {
            setProductos(respuesta.Productos)
          })
          .catch((error) => console.error("Error fetching data:", error));
    },[]);

    //GET NAFTA
    useEffect(() => {
        fetch(`${Url}/entrega/nafta/`)
        .then((res) => res.json())
        .then((respuesta) => {
            setNafta(respuesta.Precio_litro)
          })
          .catch((error) => console.error("Error fetching data:", error));
    },[]);
    
    //GET CLIENTES
    useEffect(() => {
        fetch(`${Url}/entrega/cliente/`)
        .then((res) => res.json())
        .then((respuesta) => {
            setClientes(respuesta.Clientes)
          })
          .catch((error) => console.error("Error fetching data:", error));
    },[]);
    
// LISTA DE PRODUCTO SELECCIONADOS

    const setearIdProducto= (id) =>{ //CUANDO SE SELECCIONA UN PRODUCTO EN EL INPUT SE GUARDA EN EN ARRAY DE PS(PRODUCTOS SELECIONADOS)

        const PS= productos.find(producto => producto.id === id) //BUSCO EN LA LISTA DE PRODUCTOS EL PRODUCTO SELECCIONADO CON EL ID

        const yaSeleccionado = productosSeleccionados.some(producto => producto.id === id); //VERIFICA SI YA ESTA EN EL ARRAY DE PS

       if (!yaSeleccionado && PS) { //SI NO ESTA SELECIONADO LO AGREGA

            setProductosSeleccionados(prevProductosSeleccionados => [
            ...prevProductosSeleccionados, // Mantener los productos ya seleccionados
            {
                id: PS.id,
                tipo: PS.tipoProducto,
                litro: PS.litro,
                cantidad: 1,
            }
            ]);
        } else {
            masCantidad(id) //SI YA ESTA AGREGADO LE INCREMENTA UN VALOR A LA CANTIDAD
  }
    }
    const masCantidad = (id)=>{ //FUNCION PARA INCREMENTAR LA CANTIDAD
        const select = productosSeleccionados.find(p => p.id === id)

        if (select) {
            // Incrementar la cantidad en 1
            const nuevosProductos = productosSeleccionados.map(producto => {
              if (producto.id === id) {
                return { ...producto, cantidad: producto.cantidad + 1 }; // Incrementa la cantidad
              }
              return producto;
            });
            setProductosSeleccionados(nuevosProductos);
          }
        
    }
    const menosCantidad = (id)=>{ //FUNCION PARA DECREMENTAR LA CANTIDAD
        const select = productosSeleccionados.find(p => p.id === id)

        if (select) {
            // decrementar la cantidad en 1
            const nuevosProductos = productosSeleccionados.map(producto => {
              if (producto.id === id) {

                if(producto.cantidad<=1){ //si la cantidad es menor a 1 se elimina el producto
                    return null;
                }
                return { ...producto, cantidad: producto.cantidad - 1 }; 
              }
              return producto;
            }).filter(Boolean);
            setProductosSeleccionados(nuevosProductos);
          }
        
    }

 //CLIENTE
    const setearIdCliente= (id) =>{
        setClienteSelect(id)
    }
    const setearIdNafta= (id) =>{
        setNaftaSelect(id)
    }

//POST
const handlePost = async (e) => {
    e.preventDefault();

    const data={
        'usuario':2,
        'cliente': clienteSelect,
        'productos': productosSeleccionados,
        'nafta': naftaSelect,
        "litrosGastados":cantLitros
    }

    try {
        const response = await fetch(`${Url}/entrega/entrega/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Entrega registrada exitosamente")
            window.location.reload();
            // Reseteo los estados a sus valores por defecto (reset del formulario)
        } else {
            const errorData = await response.json();
            // Manejar el error, en este caso mostrar un mensaje al usuario
            if (errorData.Error) {
                alert(errorData.Error);  // Mostrar el mensaje de error del backend
            } else {
                alert("Hubo un error al agregar la entrega.");
            }
            console.error("Hubo un error al agregar la entrega:", errorData);
        }
        
    } catch (error) {
        alert(error)
        console.error("Error en la solicitud:", error);
    }
    
}

    return (
        <div className="container">
            <div className="pageProducto">
                <button>
                    <Link to="/home" className="back-button">←</Link>    
                </button> 

                <h2>Agregar Entrega</h2>

                <form className="login-form" onSubmit={handlePost} >

                    <div className="form-group">
                        <p>Clientes</p>
                        <InputBuscador lista={clientes} setId={setearIdCliente}></InputBuscador>
                    </div>

                    {/* CONTENEDOR DE LOS PRODUCTOS SELECCIONADOS */}
                    <div className='contListaProducto'> 
                        <InputBuscador lista={productos} setId={setearIdProducto}></InputBuscador>
                        <h1>
                             
                             <span>producto</span>
                             <span>Cantidad</span>
                        </h1>

                        <div className='listaProducto'>
                            {productosSeleccionados.map((producto,idx)=>(
                                <div key={idx} className='lineaProducto'>
                                        <p>  
                                        <span>{producto.tipo} {producto.litro}L</span> 
                                        </p>
                                        <div className='contMasMenos'>
                                            <button type='button' onClick={()=> menosCantidad(producto.id)}>-</button>    
                                            {producto.cantidad}
                                            <button type='button' onClick={()=> masCantidad(producto.id)}>+</button> 
                                        </div>
                                        
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <p>Precio Nafta x L</p>
                        <InputBuscador lista={nafta} setId={setearIdNafta}></InputBuscador>
                    </div>

                    <div className="form-group">
                        <input type="number" id="litrosGastados" name="litrosGastados" 
                        className="input-field" placeholder='litrosGastados'
                        onChange={(e) => setCantLitros(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">Agregar Entrega</button>
                </form>
                
            </div>
        </div>
    );
};

export default RegistrarEntrega;
