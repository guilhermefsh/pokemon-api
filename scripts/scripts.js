//selecionando o container e filtro onde os cards ficarão.
const container = document.querySelector("#pokemon");
const filter = document.querySelector("#escolhas");
//cores para adicionar nos elementos
const colors = {
    fire: '#e60202',
    grass: '#62e962',
    electric: '#e7d800',
    water: '#1900ff',
    ground: '#b8b500',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#00a500',
    bug: '#ffbf64',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#acacac',
    fighting: '#5c5c5c',
    dark:'#3e0044',
    normal: '#cfcfcf'
}
const colorsType = Object.keys(colors);

//quantidade de pokemons que queremos renderizar na página
const quantPoke = 60;

// variavel onde serão armazenados os pokemons após o filtro
let allPoke = [];

//percorrer por toda quantidade de pokemons definida
const fetchPoke = async()=>{
    for(let i = 1; i <= quantPoke; i++){
        await getPoke(i);
    }
}

//Função para buscar pokemons por tipo
const fetchPokeByType = async (type) =>{
    //api onde fazemos a requisição por tipo
    const url = `https://pokeapi.co/api/v2/type/${type}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const pokemons = data.pokemon
        //filtro para garantir que somente urls validas sejam renderizadas
        .filter(p => p.pokemon.url.includes('/pokemon/'))
        //matriz que limita a quantidade de pokemons a variavel na qual atribuimos a quantidade a ser renderizada
        .slice(0, quantPoke)
        //transforma a matriz de objetos, sendo apenas uma lista simples com URL e nome de cada pokemon
        .map(p => p.pokemon);

    //cada elemento poke é um objeto contendo a URL e nome do pokemon
    for (const poke of pokemons) {
        await getPoke(poke.url, type);
    }
};

//função para buscar dados
const getPoke = async (idOrUrl, filterType = null) =>{
    const url = typeof idOrUrl === 'string' ? idOrUrl : `https://pokeapi.co/api/v2/pokemon/${idOrUrl}`;
    const resp = await fetch(url);
    const data = await resp.json();

    // Verificar se o Pokémon possui exatamente o tipo filtrado
    if (filterType && data.types.length === 1 && data.types[0].type.name !== filterType) {
        return;
    }

    allPoke.push(data);
    createCard(data);
};

//criação do card
const createCard = (poke) => {
    //criando e atribuindo classe
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    //atribuindo os tipos de elementos que vamos solicitar à api
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const typePoke = poke.types.map(type => type.type.name).join(' and ');
    const color = colors[poke.types[0].type.name];

    //criando o HTML dinâmico
    const pokemonInnerHTML = `
        <div id="pokemon-card" data-type="${typePoke}">
            <div class="pokemon-img">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" width="120" alt="">
            </div>
            <div class="pokemon-info">
                <h3 class="pokemon-name">${name}</h3>
                <span class="pokemon-numero">Pokemon #${id}</span>
                <p class="pokemon-elemento">Elemento: <span class="tipo-elemento">${typePoke}</span></p>
            </div>
        </div>
    `

    card.innerHTML = pokemonInnerHTML;

    //alterando cor do elemento correspondente
    const typeElement = card.querySelector('.tipo-elemento');
    typeElement.style.color = color;

    //container recebe o card
    container.appendChild(card);
}

//função para filtrar os pokemons
const filterPokemons = (type) =>{
    container.innerHTML = ''; //limpando os pokemons anteriores
    allPokemons = [] //reseta a lista

    //aqui eu faço a verificação do select, se for all renderiza por id, se não por tipo
    if(type === 'all'){
        fetchPoke();
    } else{
        fetchPokeByType(type);
    }
};

//adicionado evento ao select
filter.addEventListener('change', (e) =>{
    const selectedType = e.target.value;
    filterPokemons(selectedType);
});

fetchPoke();