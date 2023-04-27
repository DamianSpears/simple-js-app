let pokemonRepository = (function () {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

   function add(pokemon) {
      pokemonList.push(pokemon);
   }

   function getAll() {
      return pokemonList;
   }

   function addListItem(pokemon) {
      let pokemonUlist = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.classList.add('pokemon-button');
      button.innerText = pokemon.name;
      listItem.appendChild(button);
      pokemonUlist.appendChild(listItem);
      button.addEventListener('click', function() {
         showDetails(pokemon);
      });
   };
   //addListItem currently goes through the array to turn all objects into a button and styles the object.//
   //An event listener has been added to show the details of each pokemon in the console.//

   function showDetails(pokemon) {
         loadDetails(pokemon).then(function (){
            console.log(pokemon);
         });    
   };
   // This function logs each pokemon object to the console as the loop below goes through each object.//

   function loadList() {
      return fetch(apiUrl).then(function (response) {
         return response.json();
      }).then(function (json) {
         json.results.forEach(function (item) {
            let pokemon = {
               name: item.name,
               detailsUrl: item.url
               //detailsUrl will only load JSON, which is why we will create
               //a new function to parse the JSON (showDetails)
            };
            add(pokemon);
         });
      }).catch(function (e) {
         console.error(e);
      })
   }

   function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
         return response.json();
      }).then(function (details) {
         item.imageUrl = details.sprites.front_shiny;
         item.height = details.height;
         item.type = details.types;
      }).catch(function (e) {
         console.error(e);
      });
   }
   //^This function will take the detailsUrl and parse the JSON code to be used in JS

   return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
   };
   //The above is a series of returns for the defined functions inside the IIFE//

})();
//Everything above is in an IIFE for 'Pokemon Repository'//

pokemonRepository.loadList().then(function () {
   pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
   });
});

//The loadlist function now loads all pokemon from the API before looping through them
//the promise (.then) is in place to asynchronously load the data from the API

//Within the loadlist there is a loop that currently adds the objects
//inside the array as list items and gives them styling through CSS styles