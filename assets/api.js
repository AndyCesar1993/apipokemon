/* 
https://pokeapi.co/api/v2/pokemon/905
 */

const pokeId = async (id)=>{
    const urlBase="https://pokeapi.co/api/v2/pokemon/";
    try {
        const response = await fetch(urlBase + id);
        const data = await response.json();
        return data;
        
    } catch (error) {
        alert("Hubo un error al consultar la API de pokeapi!");
    }
};


