export default function validate(form){
    
    let error = {};
    
    //name
    if(!form.name.length){
        error.name = "Enter a name de la actividad"
    } else if(!/^[a-zA-Z]+$/.test(form.name)){
        error.name = "caracteres invalidos"
    }

    //difficulty
    const difficulty = parseInt(form.difficulty);
    if(difficulty < 1 || difficulty > 5 || isNaN(difficulty)){
        error.difficulty = "tiene que ser un numero del 1 al 5";
    }

    //duracion
    const duracion = parseInt(form.duracion);
        if(!duracion || isNaN(duracion) || duracion < 0){
            error.duracion = "duracion invalida. Debe ser un numero entero mayor que cero";
    }

    //season
    const season = form.season;
    if (!["Verano","Otoño","Invierno","Primavera"].includes(season)) {
        error.season = "No existe esa season";
      }

    return error;
}