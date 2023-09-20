
const API = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

const content = document.getElementById('content');

async function fetchData (urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const pokeApi = await fetchData(API);
        const results = pokeApi.results;
        const res = results.slice(0, 10);
        let pokemon = [];

        for (const iterator of res) {
            let forPokemon = await fetchData(iterator.url);

            let view = `
                <div class="group relative">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${forPokemon.sprites.other.dream_world.front_default}" alt="" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">                        
                        ${forPokemon.name}
                        </h3>
                    </div>
                </div>
            `   

            pokemon.push(view)
        }

        content.innerHTML = pokemon;
        
        
    } catch (error) {
        console.error(error.message);
    }
})();
