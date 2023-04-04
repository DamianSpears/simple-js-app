let pokeDex = (function() {
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

   return {
      add: function(pokemon) {
         pokeDex.push(pokemon);
      },

      getAll: function() {
         return pokemonList;
      }
   }
   //These two keys now allow referencing globally from outside loops//
   
})();

pokeDex.getAll().forEach (function(pokemon) {
   document.write (pokemon.name + ', ' + pokemon.height + ', is a ' + pokemon.type + ' type pokemon.<br>')
});
//The loop now uses getAll as a function and loops through each object in the array, printing the statement for each pokemon.//
