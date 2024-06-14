import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importa las funciones necesarias
import Login from './componentes/Login/Login'; // Ajusta la ruta al archivo Login.js
import Home from './componentes/Home/Home'; // Ajusta la ruta al archivo Home.js
import RegistrarEntrega from './componentes/RegistrarEntrega/RegistrarEntrega';
import AgendarCliente from './componentes/AgendarCliente/AgendarCliente';
import AgregarProducto from './componentes/AgregarProducto/AgregarProducto';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registrarEntrega" element={<RegistrarEntrega />} />
          <Route path="/agendarCliente" element={<AgendarCliente />} />
          <Route path="/agregarProducto" element={<AgregarProducto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
