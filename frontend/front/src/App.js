// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './componentes/UserContext';
import Login from './componentes/Login/Login';
import Home from './componentes/Home/Home';
import AgendarCliente from './componentes/AgendarCliente/AgendarCliente';
import AgregarProducto from './componentes/AgregarProducto/AgregarProducto';
import RegistarEntrega from './componentes/RegistrarEntrega/RegistrarEntrega';
import PrecioNafta from './componentes/PrecioNafta/PrecioNafta';

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
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
