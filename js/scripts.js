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

   function showDetails(details) {
      loadDetails(details).then(function () {
         showModal(details);
      });
   };
   // This function is waiting for an input for the details parameter, it should receive 
   //details about height, type, and receive an imageUrl, which will be passed into the showModal function./

   function showModal(details) {
      pokemonRepository.loadDetails(details).then(function () {
         //First, this function needs to load the details of the pokemon (imageUrl, height, type)
         let modalContainer = document.querySelector('#modal-container');
         modalContainer.innerText = '';

         let modal = document.createElement('div');
         modal.classList.add('modal');

         let closeButtonElement = document.createElement('button');
         closeButtonElement.classList.add('modal-close');
         closeButtonElement.innerText = 'x';
         closeButtonElement.addEventListener('click', hideModal);

         let pokemonName = document.createElement('h1');
         pokemonName.innerText = 'name: ' + details.name;

         let pokemonDetails = document.createElement('p');
         pokemonDetails.innerText = 'Height: ' + details.height;

         let imageContainer = document.createElement('image-container');
         let pokemonImage = document.createElement('img');
         pokemonImage.src = details.imageUrl;

         modal.appendChild(closeButtonElement);
         modal.appendChild(pokemonName);
         modal.appendChild(pokemonDetails);
         modal.appendChild(imageContainer);
         modalContainer.appendChild(modal);
         imageContainer.append(pokemonImage);

         modalContainer.classList.add('is-visible');

         window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
               hideModal();
            }
         });

         modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal container,
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
               hideModal();
            }
         });
         //When this function is called, the is-visible will make the modal appear, as it is initially not visible.
         //Here, I have created the layout for the modal. When the showModal function is called, the parameter will be
         //Used to display the pokemone name and height, while the close button will be present to close the modal.
      })
   }

   function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
   }

   return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal
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

