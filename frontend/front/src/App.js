// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './componentes/UserContext';
import Login from './componentes/Login/Login';
import Home from './componentes/Home/Home';
import AgendarCliente from './componentes/Cliente/AgendarCliente/AgendarCliente';
import AgregarProducto from './componentes/Producto/AgregarProducto/AgregarProducto';
import RegistarEntrega from './componentes/RegistrarEntrega/RegistrarEntrega';
import PrecioNafta from './componentes/nafta/PrecioNafta/PrecioNafta';
import VerEntrega from './componentes/VerEntregas/VerEntrega';
import ListaNafta from './componentes/nafta/listaNafta/listaNafta';
import VerProductos from './componentes/Producto/verProductos/VerProductos';
import InputBuscador from './componentes/ComponentesPrueba/InputBuscador';
import VerClientes from './componentes/Cliente/VerClientes/VerClientes';

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/agendarCliente" element={<AgendarCliente />} />
                    <Route path="/agregarProducto" element={<AgregarProducto/>}/>
                    <Route path="/registrarEntrega" element={<RegistarEntrega/>}/>
                    <Route path="/precioNafta" element={<PrecioNafta/>}/>
                    <Route path="/listaNafta" element={<ListaNafta/>}/>
                    <Route path="/verEntrega" element={<VerEntrega/>}/>
                    <Route path="/verClientes" element={<VerClientes/>}/>
                    <Route path="/verProductos" element={<VerProductos/>}/>
                    <Route path="/prueba" element={<InputBuscador/>}/>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
