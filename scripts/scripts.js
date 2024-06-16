//selecionando o container onde os cards ficarão.
const container = document.querySelector("#pokemon");
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
    normal: '#F5F5F5'
}

const colorsType = Object.keys(colors);

//quantidade de pokemons que queremos renderizar na página
const quantPoke = 60;

//percorrer por toda quantidade de pokemons definida

const fetchPoke = async()=>{
    for(let i = 1; i <= quantPoke; i++){
        await getPoke(i);
    }
}

const getPoke = async (id) =>{

    //url da api de onde iremos fazer as requisições
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    //resposta da promisse
    const resp = await fetch(url);
    const data = await resp.json();
    createCard(data);
}

//criação do card
const createCard = (poke) => {
    //criando e atribuindo classe
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    //atribuindo os tipos de elementos que vamos solicitar à api
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const typePoke = poke.types.map(type => type.type.name);
    const type = colorsType.find(type=> typePoke.indexOf(type) > -1);
    const color = colors[type];

    //criando o HTML dinâmico
    const pokemonInnerHTML = `
        <div id="pokemon-card">
            <div class="pokemon-img">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" width="140" alt="">
            </div>
            <div class="pokemon-info">
                <h3 class="pokemon-name">${name}</h3>
                <span class="pokemon-numero">Pokemon #${id}</span>
                <p class="pokemon-elemento">Elemento: <span class="tipo-elemento">${type}</span></p>
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

fetchPoke();
