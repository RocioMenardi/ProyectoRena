import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import Url from '../../../utils/url';




export default function Put({ id, producto, productUpdate }) {
    const [tipoProducto, setTipoProducto] =  React.useState([]);
    const [litros, setLitros] =  React.useState([]);
    const [costo, setCosto] = React.useState('');
    const [precioVenta, setPrecioVenta] = React.useState('');
    const [selectedTipoProducto] = React.useState('');
    const [selectedLitros, setSelectedLitros] = React.useState('');
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

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

    //Cargar datos del producto
    useEffect(() => {
        if (producto) {
          setCosto(producto.costo);
          setPrecioVenta(producto.precioVenta);
          
          for(const litroFor of litros){
            if(producto.litro=== litroFor.cantidad){
                setSelectedLitros(litroFor.id)
                console.log("entro litro")
            }
          }
        }
      }, []);
      

      //PUT
    const handlePut = async (e) => {
        e.preventDefault();
        // const producto_id = { id }; 
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
        
        // Datos a enviar
        const data = {
            id:id,
            litro: selectedLitros,
            costo: costoFloat,
            precioVenta: precioFloat
            
        };
        try {
            const response = await fetch(`${Url}/producto/producto/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                const updatedProduct = await response.json();
                alert("Producto editado exitosamente")
                setOpen(false);
                productUpdate(updatedProduct)

            } else {
                console.error("Hubo un error al editar el producto");
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

          <DialogTitle>{producto.tipoProducto} {producto.litro}L</DialogTitle>
     
                <form className="login-form" >

                    <div className="form-group">

                        <select type="text" id="tipoProducto" name="tipoProducto" 
                        className="input-field" placeholder='Tipo producto'

                        value={selectedTipoProducto} // Establecer valor seleccionado

                        disabled={true}
                        >
                            <option value={selectedTipoProducto}>{producto.tipoProducto}</option>
                            {tipoProducto.map((tipo, idx) => (
                                <option key={idx} value={tipo.id}>{tipo.nombre}</option>
                            ))}

                        </select>

                    </div>

                    <div className="form-group">
                        <select type="text" id="litros" name="litros" 
                        className="input-field" placeholder='Litros'
                        value={selectedLitros.id} // Establecer valor seleccionado

                        onChange={(e) =>{
                            const value = e.target.value;
                            setSelectedLitros(value || {selectedLitros}); 
                          }}>
                           
                            <option value="">Cantidad </option>
                            {litros.map((litro, idx) => (
                                <option key={idx} value={litro.id}>{litro.litro} L</option>
                            ))}

                        </select>

                    </div>

                    <div className="form-group">
                        <label htmlFor="costo" style={{fontSize:"0.8rem", marginLeft:"5px"}}>Costo</label>
                        <input type="text" id="costo" name="costo" 
                        className="input-field" placeholder="Costo"
                        value={costo}
                        onChange={(e) => setCosto(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="precioVenta" style={{fontSize:"0.8rem", marginLeft:"5px"}}>Precio venta</label>
                        <input type="text" id="precioVenta" name="precioVenta" 
                        className="input-field" placeholder='Precio venta'
                        value={precioVenta}
                        onChange={(e) => setPrecioVenta(e.target.value)}/>
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