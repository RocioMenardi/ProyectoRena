const InputBuscador = () => {
    let input, filter, dropdown, options, i;

    // Obtener el input y su valor en mayúsculas para hacer la búsqueda
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();

    // Obtener el dropdown (menú desplegable) y todas las opciones dentro de él
    dropdown = document.getElementById("dropdown");
    options = dropdown.getElementsByTagName("a");  // Asumiendo que las opciones son etiquetas <a>

    // Bucle que recorre todas las opciones del dropdown
    for (i = 0; i < options.length; i++) {
        // Si el texto de la opción incluye el filtro (palabra escrita), la muestra, de lo contrario, la oculta
        options[i].style.display = options[i].innerText.toUpperCase().includes(filter) ? "block" : "none";
    }

    return(
        <div style={{width:'100%', height:'100vh', display:"flex", alignItems:"center", justifyContent:"center"}}>
            <input type="text" id="searchInput" 
            onkeyup="InputBuscador()" placeholder="Buscar..."></input>
            <div id="dropdown">
                <a href="#">Opción 1</a>
                <a href="#">Opción 2</a>
                <a href="#">Opción 3</a>
            </div>
        </div>
    )
};
export default InputBuscador;