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
    });
}
// request que trae info individual segun el pokemon elegido en el modal
function pokemonModal(pokemonToShow) {
    return $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${pokemonToShow}`,
        // para poner limite de resultados
        data: {limit:10}
    }).done(function(singleResponse){
        paintModalPokemon(singleResponse)
    })
}

// request que trae la descripcion del pokemon elegido en el modal
function pokemonDescription(pokemonToShow) {
    return $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon-species/${pokemonToShow}`,
        // para poner limite de resultados
        data: {limit:10}
    }).done(function(descriptionResp){
        paintPokeDescription(descriptionResp)
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
        // console.log(pokeName)
        pokemonDetail(pokeName)
    });        
};

// funcion para pintar
function paintPokemon(pokemonImg, pokemonName) {
    let templete = `<div class="panel panel-default col-md-2 col-md-offset-1">
    <div class= "panel-heading">
        <img class="img-responsive text-center" src="${pokemonImg}" alt="${pokemonName}">
    </div>
    <div class="panel-body">
        <h3 class="panel-title text-center">${pokemonName}</h3>
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
// faltaba la clase para indicarle cual es elemento que se busca (donde estan los dataset)
$(document).on("click", ".pokemon-modal", showModal);

// funcion que detoma el tercer request. Llama solo al pokemon que se selecciona
function showModal(singleResponse) {
    let pokemonToShow = $(this).data("pokemon");
    // console.log(pokemonToShow)
    // console.log(singleResponse)
    // request que obtiene info general del pokemon
    pokemonModal(pokemonToShow);
    // request que obtiene descripcion del pokemon
    pokemonDescription(pokemonToShow);

    paintModalPokemon(singleResponse);
};

function paintModalPokemon (singleResponse) {
    // console.log(singleResponse)
    // informacion especifica
    const singlePokeName = singleResponse.name
    const singlePokeWeight = singleResponse.weight
    const singlePokeHeight = singleResponse.height
    const singlePokeImage = singleResponse.sprites.front_default
    const singlePokeMoves = singleResponse.moves[0].move.name
    const arrayPokeType = singleResponse.types
    const singlePokeType = arrayPokeType.map(function(item) {
        return item.type.name
    })
    // console.log(singlePokeType)
    const title = document.getElementById('pokemon_title')
    const image = document.getElementById('pokemon_image')
    const height = document.getElementById('height')
    const weight = document.getElementById('weight')
    const moves = document.getElementById('moves')
    const type = document.getElementById('type')

    title.innerHTML = singlePokeName;
    image.src = singlePokeImage;
    height.innerHTML = singlePokeHeight + "inch";
    weight.innerHTML = singlePokeWeight + "lb";
    moves.innerHTML = singlePokeMoves;
    type.innerHTML = singlePokeType;

};

// funcion que pintara la descipcion del pokemon
function paintPokeDescription(descriptionResp) {
    // console.log(descriptionResp)
    const pokeDescription= descriptionResp.flavor_text_entries[3].flavor_text

    const description = document.getElementById('pokemon_description')
    description.innerHTML = pokeDescription;
};

// obtener info del modal, segundo request
function pokemonInfoData(response) {
    // console.log(response)
    let pokemonName = response.name
    let pokemonImg = response.sprites.front_default
    // console.log(typeof pokemonName)

    paintPokemon(pokemonImg, pokemonName)
    // showModal(pokemonName)
};
