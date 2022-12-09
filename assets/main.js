//console.log(pokeId(5))


const renderError = document.querySelector(".error");
const renderHtml = document.querySelector(".render-html");
const form = document.querySelector(".buscador");
const inputId = document.getElementById("number-id");

const error= mensage=>{
    renderError.style.display="flex";
    renderError.textContent=mensage;
}

let pokemones=JSON.parse(localStorage.getItem("pokemones"))|| [];

const saveLocalStorage =(pokemones)=>{
    localStorage.setItem("pokemones",JSON.stringify(pokemones));
}

const getPokemon= pokemon =>{
    return `<div class="cards">
    <i class="bi bi-x-square quitar" data-id="${pokemon.id} "></i>
    <img src="${pokemon.sprites.other.home.front_default}" alt="">
    <h2>${pokemon.name.toUpperCase()} </h2>
    <h3>Exp: <small>${pokemon.base_experience} </small></h3>
    <ul class="tipo">
    ${pokemon.types.map((tipo)=>{
        return `<li><div class="tipo-nombre"><img src="./assets/img/tipos/${tipo.type.name}.png" alt="">${tipo.type.name}</div></li>`
    }).join("")}        
    </ul>
    <h3>Altura: <small>${pokemon.height/10} m</small></h3>
    <h3>Peso: <small>${pokemon.weight/10} Kg</small></h3>
</div>`
}

const renderPokemonList=(pokemones)=>{
    renderHtml.innerHTML= pokemones.map((pokemon)=>getPokemon(pokemon)).join("");
}

const searchPokemon = async (e) =>{
    e.preventDefault();

    const pokemonId = inputId.value;

    if (pokemonId == "") {
      error("Se debe ingresar un numero de Id!");
      form.reset();
      return;
    }
    if (pokemonId > 905) {
      error("El numero de Id no puede ser mayor a 905");
      form.reset();
      return;
    }
    const datosPokemon= await pokeId(pokemonId); 
    if (pokemones.some((pokemon)=>pokemon.id === datosPokemon.id)){
        error("El pokemon ya se esta mostrando!")
        form.reset();
        return;
    }

    renderError.style.display = "none";
    renderError.textContent = "";
    pokemones=[datosPokemon,...pokemones];
    renderPokemonList(pokemones);
    saveLocalStorage(pokemones);
    form.reset();
}

const quitarPoquemon= (e) =>{
    if(!e.target.classList.contains("quitar")) return;
    
    const clickPokemonId = e.target.dataset.id;

    if(window.confirm("Está seguro que desea eliminar el pokemon")){
        pokemones= pokemones.filter((pokemon)=>pokemon.id !== Number(clickPokemonId));
        renderPokemonList(pokemones);
        saveLocalStorage(pokemones);
    }
}

const init=()=>{
    renderPokemonList(pokemones);
    form.addEventListener("submit",searchPokemon);
    renderHtml.addEventListener("click",quitarPoquemon);
}
init();