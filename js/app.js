// request principal. Meterlo en una funcion

$.ajax({
    url:`https://pokeapi.co/api/v2/pokemon/`,
    // para poner limite de resultados
    data: {limit:10} 
}).done(handleResponse).fail(handleFailure)

// request de info individual, pasando el nombre del pokemon para hacer el segundo request
function pokemonDetail(pokeName) {
    return $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${pokeName}`,
        // para poner limite de resultados
        data: {limit:10}
    }).done(function(response){
        pokemonInfoData(response)
    })
}

// funcion de respuesta principal
function handleResponse (data) {
    // console.log(data)
    const pokeData = data.results
    getPokemonInfo(pokeData)
    // console.log(pokeData)
};

// pintar pokemones
function getPokemonInfo(pokeData) {
    pokeData.forEach(element => {
        // console.log(element)
        // obtener datos de cada pokemon
        let pokeName = element.name;
        // let pokeUrl = element.url;
        // console.log(pokeName)
        pokemonDetail(pokeName)
    });
        
    // console.log(pokeData)
    // return pokeData
};

// funcion para pintar
function paintPokemon(pokemonImg, pokemonName) {
    let templete = `<div class="panel panel-default col-md-2 col-md-offset-1">
    <div class= "panel-heading">
        <img class="img-responsive" src="${pokemonImg}" alt="${pokemonName}">
    </div>
    <div class="panel-body">
        <h3 class="panel-title">${pokemonName}</h3>
        <a class="pokemon-modal" data-toggle="modal" data-target="#pokemon_info" data-pokemon="${pokemonName}" href="">conoce más</a>
    </div>
    </div>`
// console.log(templete)

// contenedor de pokemones
const pokeContainer = document.getElementById('poke_container')
pokeContainer.innerHTML += templete;
    
};
// funcion en caso de que todo falle
function handleFailure () {
    console.log('Vuelve a intentar')
}

// evento del modal
$(document).on("click", showModal);

const arrayPokemon = []
function showModal(pokemonName) {
    arrayPokemon.push(pokemonName)
    let pokemonToShow = $(this).data("pokemon");
    console.log(pokemonToShow)
    // console.log(arrayPokemon)
    // for (const iterator of arrayPokemon) {
    //     console.log(iterator)
    // }
    // if (pokemonToShow == arrayPokemon){
    //     console.log('son iguales')
    // };
    const title = document.getElementById('pokemon_title')
    title.innerText = pokemonName
};

// obtener info del modal, segundo request
function pokemonInfoData (response) {
    let pokemonName = response.forms[0].name
    let pokemonImg = response.sprites.front_default
    // console.log(pokemonName)

    paintPokemon(pokemonImg, pokemonName)
    showModal(pokemonName)
};
