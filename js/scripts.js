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

pokemonList.forEach (function(pokemon) {
   document.write (pokemon.name + ', ' + pokemon.height + ', is a ' + pokemon.type + ' type pokemon.<br>')
});