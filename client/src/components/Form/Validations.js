export default function validate(form){
    
    let error = {};//guardamos los errores en el objeto vacio.
    
    //name
    if(!form.name.length){
        error.name = "cast activiy name" // si no contiene ningun nombre que largue error
    } else if(!/^[a-zA-Z\s]+$/.test(form.name)){
        error.name = "invalid characters"
    }

    //difficulty
    const difficulty = parseInt(form.difficulty);// convertimos a number
    if(difficulty < 1 || difficulty > 5 || isNaN(difficulty)){ // preguntamos si difficulty es mayor a 1, o si es menos a 5 y si no contiene ningun number
        error.difficulty = "It has to be a number from 1 to 5";
    }

    //duracion
    const duracion = parseInt(form.duracion);//lo convertimos en un entero
        if(!duracion || isNaN(duracion) || duracion < 0){//preguuntamos primero si no existe la duracion, o si no contiene ningun number, y si es mayor a 0
            error.duracion = "invalid duration. Must be an integer greater than zero";
    }

    //season
    const season = form.season;
    if (!["Verano","Otoño","Invierno","Primavera"].includes(season)) {//Preguntamos si dentro de la constante season existe alguna de las seasons
        error.season = "Select a season";
      }

    return error;
}