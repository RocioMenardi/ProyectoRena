import "./VerEntrega.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonModal from "../botonModal/BotonModal";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Url from "../../utils/url";


const VerEntrega =() =>{
    const [entregas, setEntregas] =  useState([]); // Estado para almacenar las entregas
    const navigate = useNavigate();
    const [page, setPage] = useState(1);// Estado para la página actual
    const [primeraConsul, setPrimeraConsul]=useState(false) //Para la primera consulata
    const [hasMore, setHasMore] = useState(false); //para controlar las solicitudes, solo si hay mas paginas
    const contenedor = document.querySelector('.contGeneralInfo'); //const para manejar el scroll en el contenedor de la info y no en el general

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    };

    //Se llama siempre que se produzca un cambio en la const page
    useEffect(() => {
        fetchEntregas(page);
      }, [page]);

    //se le pasa la page para que haga la consulta
    const fetchEntregas = (page) => {
        fetch(`${Url}/entrega/entrega/?page=${page}`)

          .then((res) => res.json())
          .then((respuesta) => {

            if (!primeraConsul) { //en caso de ser la primera consulata
                setEntregas(respuesta.results.Entregas); //setea la const entrega
                setPrimeraConsul(true); // Y  cambia el estado de la primera consulata para que no vuelva a entrar aca

                if(respuesta.next){ // y si en la primera consulata me dice que hay mas paginas se setea el hasMore en true
                    setHasMore(true)
                }
              } else { //Para las siguieintes consultas entra aca

                if(!respuesta.next){ //si no hay mas paginas 
                    setHasMore(false) //seteamos el hasMore en false para que no se realicen mas solicitudes
                }
                setEntregas((prevEntregas) => [ //en las siguientes consultas a la const entrega se le va concatenando las nuevas entregas de la consulta
                  ...prevEntregas,
                  ...respuesta.results.Entregas.filter(
                    (nuevaEntrega) =>
                      !prevEntregas.some(
                        (entregaExistente) => entregaExistente.id === nuevaEntrega.id
                      )
                  ),
                ]);
              }

          })
          .catch((error) => console.error("Error fetching data:", error));
      };
    
      useEffect(() => { //este useEffect se activa si hasMore es True

        if (isMobileDevice()) { //aca verificamos que dispositivo esta visitando la pagina, si un movil o un desktop
            const handleMobileScroll = () => handleScroll(true); //y el evento del scroll es escuchado en toda la ventana
            window.addEventListener('scroll', handleMobileScroll);
            return () => {
                window.removeEventListener('scroll', handleMobileScroll); // Limpieza
            };
        }else {
            // Si no es móvil, se añade el evento de scroll al contenedor
            if (contenedor) {
                const handleDesktopScroll = () => handleScroll(false);
                contenedor.addEventListener('scroll', handleDesktopScroll);
                return () => {
                    contenedor.removeEventListener('scroll', handleDesktopScroll); // Limpieza
                };
            }
        }
      }, [hasMore]);
      
      //esta const es llamada por el useEffect de arriba, el cual funciona siempre y cuando hasMore sea true.
      //por lo tanto es importante que si next es false hasMore pase a ser false, para deje de escuchar el scroll y no me genere solicitudes con numeros de page invalidos
      const handleScroll = (movil) => {
        if(movil){ //cuando detecta con el scroll que se esta llegando al final de la pagina, incrementa la const page y vuelve a llamar al primer use effect ejecutando todo nuevamente
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && hasMore) {
                setPage(page + 1);
            }
        }else{
            if(contenedor){ //lo mismo pero en el contenedor del la info
                if (contenedor.scrollHeight - contenedor.scrollTop <= contenedor.clientHeight + 50 && hasMore) {
                    setPage(page + 1);
            }   
        }
      };
}

    return(
        <div className="container">
            <div className="contGeneralInfo">

                <button className="back-buttonNafta" onClick={() => navigate(-1)}>←</button> 

                {isMobileDevice() && <button onClick={() => navigate('/registrarEntrega')} className='buttonEntrega'>Registrar Entrega</button>} 

                <h1>Entregas</h1>
                
               {entregas.map((entrega, index) => (

                    <div className="contInfo" key={index}>
                        <p>Cliente: {entrega.cliente}</p>
                        <ul>
                            <li><strong>Usuario:</strong> {entrega.usuario}</li>
                            <li><strong>Fecha:</strong> {entrega.fecha} : {entrega.hora}hs</li>
                            <li><strong>Monto total:</strong> ${entrega.Total}</li>
            
                        </ul>
                        <div className='contBotonesEntrega'>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>

                        <BotonModal entrega={entrega}></BotonModal>
                        
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                        </div> 
                    </div>
               ))}
            
            </div>
            {isMobileDevice()===false && <button onClick={() => navigate('/registrarEntrega')} className='button'>Registrar Entrega</button>} 
        </div>
    )
};
export default VerEntrega