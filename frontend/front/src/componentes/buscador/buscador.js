import React, { useState, useEffect } from 'react';
import style from './buscador.module.css'; 

const Buscador = ({ onSearch }) => {
    // Estado para almacenar el valor del campo de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    // Efecto para llamar a onSearch cuando searchTerm cambia
    useEffect(() => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    }, [searchTerm, onSearch]);

    const handleSearchClick = () => {
        setIsClicked(true); // Marcar que se hizo clic
    };

    const handleBlur = () => {
        if (searchTerm === '') {
            setIsClicked(false);
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onClick={handleSearchClick}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={handleBlur}
                className={isClicked ? style.clicked : style.barra} // Cambia de estilo cuando se clickea    
            />
        </>
    );
};

export default Buscador;