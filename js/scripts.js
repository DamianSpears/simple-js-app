let pokemonRepository = (function () {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

   function add(param) {
      pokemonList.push(param);
   }

   function getAll() {
      return pokemonList;
   }

   function addListItem(item) {
      let pokemonUlist = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.classList.add('pokemon-button');
      button.innerText = item.name;
      listItem.appendChild(button);
      listItem.classList.add('list-group-item')
      button.classList.add('btn-secondary');
      pokemonUlist.appendChild(listItem);
      button.addEventListener('click', function () {
         showDetails(item);
      });
   };
   //addListItem currently goes through the array to turn all objects into a button and styles the object.//
   //An event listener has been added to show the details of each pokemon in the console.//

   function loadList() {
      return fetch(apiUrl).then(function (response) {
         return response.json();
      }).then(function (json) {
         json.results.forEach(function (item) {
            let a = {
               name: item.name,
               detailsUrl: item.url
               //detailsUrl will only load JSON, which is why we will create
               //a new function to parse the JSON (loadDetails)
            };
            add(a);
         });
      }).catch(function (e) {
         console.error(e);
      })
   }
   //Above is a promise that returns all data from the API url in a promise for asynchronous purposes
   //once the url data is fetched, the forEach loop goes through and selects only the data described under the "a" variable
   //which is then added to the pokemonList array via the 'add' function.

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
   //^This function will take the detailsUrl and parse the JSON code to be used in JS.
   //Then it will be used in the showDetails function to retrieve pokemon image, height, and type.
   //the 'name' does not need to be passed through the loadDetails because it is not 

   function showDetails(details) {
      loadDetails(details).then(function () {
         showModal(details);
      });
   };
   // This function is waiting for an input for the details parameter, it should receive 
   //details about height, type, and receive an imageUrl, which will be passed into the showModal function./

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
//inside the array as list items and gives them styling through CSS

