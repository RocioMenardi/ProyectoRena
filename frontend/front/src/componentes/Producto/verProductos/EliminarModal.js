import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Delete({ id, onDelete }) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
  
    //POST
    const handlePost = async () => {
      const data = { id }; // El ID viene como prop
  
      try {
        const response = await fetch("http://127.0.0.1:8000/producto/producto/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log("Producto eliminado exitosamente");
            setOpen(false);
            alert("Producto elimindado exitosamente")
            onDelete(id);
        // Aquí se llama a la función onDelete que se pasó como prop
        } else {
          console.error("Hubo un error al eliminar el producto");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };
  
    return (
      <React.Fragment>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas eliminar este producto?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handlePost}>Eliminar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  
