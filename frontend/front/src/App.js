import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importa las funciones necesarias
import Login from './componentes/Login/Login'; // Ajusta la ruta al archivo Login.js
import Home from './componentes/Home/Home'; // Ajusta la ruta al archivo Home.js

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
