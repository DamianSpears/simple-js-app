let pokemonList = [
   {
      name: 'venusaur',
      height: 2,
      type: ['grass', 'poison'],
   },
   {
      name: 'charizard',
      height: 1.7,
      type: ['fire', 'flying'],
   },
   {
      name: 'blastoise',
      height: 1.6,
      type: 'water',
   },
];


/* Above lists the pokemon inside an array titled "pokemonList". The array contains objects with
characteristics for each pokemon.*/

let pokemonLarge = ' - wow, that is a large pokemon.';

for (let i=0; i < pokemonList.length; i++) {
   if (pokemonList[i].height >= 1.7) {
      document.write(pokemonList[i].name + ' (height: ' + (pokemonList[i].height) + ')' + (pokemonLarge) + ' <br>');}
   else {
      document.write(pokemonList[i].name + ' (height: ' + (pokemonList[i].height) + ')<br>');
   }
}

/*this for loop has an if...else statement that identifies any pokemon greater than or equal to 1.7m.*/