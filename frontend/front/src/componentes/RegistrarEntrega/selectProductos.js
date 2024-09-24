import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Url from '../../utils/url';

export default function Grouped({lista}) {

   console.log(lista)
    const options = lista.map((option) => {

        if (!option.tipoProducto || typeof option.tipoProducto !== 'string') {
            // En caso de que el tipoProducto sea undefined o no sea una cadena
            return {
              firstLetter: '#', // Puedes usar cualquier símbolo para indicar un valor inválido
              ...option,
            };
          }

        console.log('segundo',option.tipoProducto[0])

        const firstLetter = option.tipoProducto[0].toUpperCase();
        console.log(firstLetter)

        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });
    
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-dem
    
      disableCloseOnSelect"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}

      groupBy={(option) => option.firstLetter}

      key={(option) => option.id}
      getOptionLabel={(option) => `${option.tipoProducto} ${option.litro}`}

      sx={{ width: 300 }}
      
      renderInput={(params) => <TextField {...params} label="With categories" />}
    />
  );
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    }]