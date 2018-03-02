$.ajax({
    url:`https://pokeapi.co/api/v2/pokemon/`,
    // para poner limite de resultados
    data: {limit:100}
}).done(handleResponse).fail(handleFailure)

// funcion de respuesta
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
        let pokeUrl = element.url;
        // console.log(pokeName)
        paintPokemon(pokeName, pokeUrl)
    });
    // console.log(pokeData)
    // return pokeData
};

// funcion para pintar
function paintPokemon(pokeName, pokeUrl) {

    let templete = `<div class="panel panel-default col-md-3">
    <div class="panel-heading">
        <img class="responsive-img" src="https://dummyimage.com/300x300/750e70" alt="${pokeName}">
    </div>
    <div class="panel-body">
        <h3 class="panel-title">${pokeName}</h3>
        <a href="${pokeUrl}">conoce más</a>
    </div>
    </div>`
console.log(templete)

// contenedor de pokemones
const pokeContainer = document.getElementById('poke_container')
pokeContainer.innerHTML += templete;

};
// funcion en caso de que todo falle
function handleFailure () {
    console.log('Vuelve a intentar')
}