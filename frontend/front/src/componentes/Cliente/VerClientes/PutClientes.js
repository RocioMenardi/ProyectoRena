import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import Url from '../../../utils/url';
import { FormControl } from '@mui/material';
import { Form } from 'react-router-dom';


export default function Put({ id, cliente, clientUpdate }) {
    const [nombre, setNombre] =  React.useState('');
    const [apellido, setApellido] =  React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [descripcion, setDescripcion] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };



    //Cargar datos del cliente
    useEffect(() => {
        if (cliente) {
            setNombre(cliente.nombre);
            setApellido(cliente.apellido);
            setDireccion(cliente.direccion);
            setDescripcion(cliente.descripcion);
            setTelefono(cliente.telefono);
        }
    }, []);

      //PUT
    const handlePut = async (e) => {
        e.preventDefault();
        
        // Datos a enviar
        const data = {
            id:id,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            descripcion: descripcion,
            direccion: direccion,
            
        };
        try {
            const response = await fetch(`${Url}/entrega/cliente/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const updatedClient = await response.json();
                alert("Cliente modificado con éxito!")
                setOpen(false);
                clientUpdate(updatedClient)

            } else {
                console.error("Hubo un error al editar el cliente");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
    <React.Fragment >
        
        <IconButton aria-label="edit" onClick={handleClickOpen} >
            <EditIcon />
        </IconButton>

        <Dialog open={open} onClose={handleClose} >
            
        <div style={{backgroundColor:"white", padding:"10px"}}>

        <DialogTitle>{cliente.nombre} {cliente.apellido}</DialogTitle>

                <form className="login-form" >
                    <div className="form-group">
                        <label htmlFor="nombre" style={{fontSize:"0.8rem", marginLeft:"5px"}}>Nombre</label>
                        <input type="text" id="nombre" name="nombre" 
                        className="input-field" placeholder="Nombre" style={{color:'black'}}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellido" style={{fontSize:"0.8rem", marginLeft:"5px"}}>Apellido</label>
                        <input type="text" id="apellido" name="apellido" 
                        className="input-field" placeholder="Apellido" style={{color:'black'}}
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono" style={{fontSize:"0.8rem", marginLeft:"5px"}}>Telefono</label>
                        <input type="text" id="telefono" name="telefono" 
                        className="input-field" placeholder="Telefono" style={{color:'black'}}
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="direccion" style={{fontSize:"0.8rem", marginLeft:"5px"}}>Direccion</label>
                        <input type="text" id="direccion" name="direccion" 
                        className="input-field" placeholder='Direccion' style={{color:'black'}}
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion" style={{fontSize:"0.8rem", marginLeft:"5px"}}>Descripcion</label>
                        <input type="text" id="descripcion" name="descripcion" 
                        className="input-field" placeholder='Descripcion' style={{color:'black'}}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}/>
                    </div>
                </form>
                
        <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handlePut}>Editar</Button>
        </DialogActions>
        </div>
        </Dialog>
        
    </React.Fragment>
    );
}