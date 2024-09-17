import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './botonModal.css'



export default function BotonModal({ entrega }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className="botonModal">Detalle</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="contenedorModal">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{textAlign:'center'}}>
            {entrega.fecha}
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <strong>Nafta (Precio por Litro):</strong> {entrega.nafta}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Productos:</strong>
          </Typography>

          <ul>
            {entrega.productos.map((producto, idx) => (
              <React.Fragment key={idx}>

              <li key={idx} >
                <strong>{producto.nombre}</strong>: {producto.cantidad}L
              </li>
              <li style={{marginBottom:'8px'}}> <strong>Precio:</strong> ${producto.precioVenta}</li>

              </React.Fragment>
            ))}

          </ul>
        </Box>
      </Modal>
    </div>
  );
}