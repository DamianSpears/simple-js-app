let pokemonRepository = (function () {
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

   function add(pokemon) {
     pokemonList.push(pokemon);
   }

   function getAll () {
      return pokemonList;
   }

   function addListItem (pokemon) {
      let pokemonUlist = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.classList.add('pokemon-button');
      button.innerText = pokemon.name;
      listItem.appendChild(button);
      pokemonUlist.appendChild(listItem);
      button.addEventListener('click', function() {
         showDetails(pokemon);
      }
      );
   };
//addListItem currently goes through the array to turn all objects into a button and styles the object.//
//An event listener has been added to show the details of each pokemon in the console.//

   function showDetails (pokemon) {
      console.log(pokemon);
   }
// This function logs each pokemon object to the console as the loop below goes through each object.//
   return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails:showDetails
      }
//The above is a series of returns for the defined functions inside the IIFE//

})();
//Everything above is in an IIFE for 'Pokemon Repository//


pokemonRepository.getAll().forEach(function (pokemon) {
   pokemonRepository.addListItem(pokemon);
});
//This is a loop that currently adds the objects inside the array as list items and gives them styling through CSS styles//