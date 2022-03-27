const getPokeUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const pokePromises = [];
for (i = 1; i <= 150; i++) {
    pokePromises.push(fetch(getPokeUrl(i)).then(response => response.json()))
}

Promise.all(pokePromises)
    .then(pokemons => {
        // console.log(pokemons)
        const liPokes = pokemons.reduce((acc, poke) => {
            const types = poke.types.map(typeInfo => typeInfo.type.name)
            acc += `
                <li class='card  ${types[0]}'>
                <img class="card-image" alt='${poke.name}' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"/>
                <h2 class='card-title'>${poke.id}. ${poke.name}</h2>  
                <p class='card-subtitle'>${types.join(' | ')}</p>
                </li>`
            return acc
        }, '')
        // console.log(liPokes)
        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = liPokes
    })

const searchs = document.querySelector('.searchs')
searchs.setAttribute('onclick', 'apertei()')
const limpar = document.querySelector('.limpar')
limpar.setAttribute('onclick', 'clean()')


function apertei() {
    const search = document.querySelector('.searchInput').value;
    const imgDiv = document.querySelector('.imgDiv');
    const imgElement = document.createElement('img');
    const imgAtributo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${search}.png`
    imgElement.setAttribute('src', imgAtributo)
    imgElement.setAttribute('id', 'xxx')
    imgDiv.appendChild(imgElement);

    const retornaNome = () => {
        const search = document.querySelector('.searchInput').value;
        const url2 = `https://pokeapi.co/api/v2/pokemon/${search}`
        fetch(url2)
            .then(response => response.json())
            .then(pokemon => {
                const pNome = document.createElement('p');
                pNome.innerText = pokemon.name
                pNome.setAttribute('class', 'pNome');
                imgDiv.appendChild(pNome);
            })
    }
    retornaNome()
}

function clean() {
    location.reload();
}

