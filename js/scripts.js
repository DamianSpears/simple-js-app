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
      let pokemonlist = document.querySelector('.list-group',);
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      let button = document.createElement('button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target','#exampleModal')
      button.innerText = item.name;
      button.classList.add('btn-primary', 'list-group-item-action');
      pokemonlist.appendChild(listItem);
      listItem.appendChild(button);
      button.addEventListener('click', function(event) {
         showDetails(item);
      });
   }
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
         item.imageUrlFront = details.sprites.front_shiny;
         item.imageUrlBack = details.sprites.back_shiny;
         item.height = details.height;
         item.weight = details.weight;
         item.type = details.types[0].type["name"] + ', '  + details.types[1].type["name"];
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
   //details about name, height, type, and receive an imageUrl, which will be passed into the showModal function./

   function showModal(item) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      //above is hoisting all of the variables to be used in the showModal function.

      modalBody.empty();
      modalTitle.empty();
      //above clears all existing content so the function below creates the only viewable content inside the modal.

      let nameElement = $('<h1>' + item.name + '</h1>');
      let imageElementFront = $('<img class= "modal-img" style = "width:50%">');
      imageElementFront.attr('src', item.imageUrlFront);
      let imageElementBack = $('<img class= "modal-img" style = "width:50%">');
      imageElementBack.attr('src', item.imageUrlBack);
      let height = $('<p>' + 'height: ' + item.height + '</p>');
      let weight = $('<p>' + 'weight: ' + item.weight + '</p>');
      let type = $('<p>' + 'type: ' + item.type + '</p>');
      //above defines the elements to be used within the modalTitle and modalBody and in which order they should present.

      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(height);
      modalBody.append(weight);
      modalBody.append(type);

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