import React, { useState, useRef } from 'react';
import './Input.css'
const list= [
    {'id':1,
    'nombre':'',
    'apellido':''
    },
    {
        'id': 2,
        'nombre': '',
        'apellido': ''
    },
]

const InputBuscador = ({setId,lista}) => {

    const [filter, setFilter] = useState('');
    const dropdownRef = useRef(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [opcionSelect, setOpcionSelect] = useState('')
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        setFilter(value);

        const dropdown = dropdownRef.current;
        const options = dropdown.getElementsByTagName("p");

        // Bucle para mostrar u ocultar las opciones del dropdown
        for (let i = 0; i < options.length; i++) {
            const optionText = options[i].innerText.toLowerCase();
            options[i].style.display = optionText.includes(value) ? "block" : "none";
        }
    };

    const handleInputFocus = () => {
        setDropdownVisible(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setDropdownVisible(false);
        }, 100); // Añadir un pequeño retraso para que dé tiempo a seleccionar una opción
    };

    const opcionSelectClick=(id , nombre, atributo2)=> {
        setId(id)
        setDropdownVisible(false);
        setFilter(`${nombre}, ${atributo2}`) 
    }


    return(
            <div className='buscador'>   
                    <input type="text"  
                    onChange={handleInputChange} 
                    placeholder="Buscar..."
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    value={filter}></input>

                    {isDropdownVisible && (
                        <div id="dropdown" ref={dropdownRef} style={{display:'flex', flexDirection:'column', alignItems:'center'}} className='contOpcion'>
                            {(Array.isArray(lista) ? lista : list).map((item, idx) => (
                                <p  key={idx} onClick={()=> opcionSelectClick(item.id , Object.values(item)[1],Object.values(item)[2] )}>{Object.values(item)[1]} {Object.values(item)[2]}</p>
                            ))} 
                            
                        </div>
                    )}
            </div>
       
    )
};
export default InputBuscador;