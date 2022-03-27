const retornaNome = () => {
    const url2 = `https://pokeapi.co/api/v2/pokemon/1`
    fetch(url2)
    .then(response => response.json())
    .then(pokemon =>{
        console.log(pokemon.name)
    })
}
retornaNome()