/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

console.log(GAMES_JSON); // Check the structure of the parsed data


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

  // Step 1: Loop over each game/item in the games array/data

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    
    // Step 2: Create a new div for the game card, which will become the game card

    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card'); // Add the class 'game-card'  to the div's class list
 
    // Step 3: Use a template literal to set the inner HTML of the game card/div to display some info
    //about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = `
    <img class="game-img" src="${game.img}" alt="${game.name}">
    <h3 class="game-title">${game.name}</h3> <!-- Add this class here -->
    <p>${game.description}</p>
    <p><strong>Pledged: $${game.pledged.toLocaleString()}</strong></p>
    <p><strong>Goal: $${game.goal.toLocaleString()}</strong></p>
    <p><strong>Backers: ${game.backers.toLocaleString()}</strong></p>
    `;
    
    
    // Step 4: Append the new game card to the games container
    //--> Find the games container in the DOM and append the new game card to it    
    gamesContainer.appendChild(gameCard);
  }
}

// Step 5: Call the function we just defined with the correct variable, GAMES_JSON, to display all games or add all games to the page
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/* document.addEventListener("DOMContentLoaded", function() {
    addGamesToPage(GAMES_JSON);
  }); */
  

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers from all games
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers; // Add the number of backers for each game
  }, 0); // Start the total at 0
  

// set the inner HTML of the contributionsCard using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Use reduce to calculate the total amount pledged
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged; // Add the pledged amount for each game
  }, 0); // Start the total at 0
  
// set the inner HTML of the raisedCard using template literal, to display the total amount raised with a dollar sign
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Set the inner HTML of the gamesCard to display the number of games
gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the length of the filtered array to see how many unfunded games there are
    console.log(unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the length of the filtered array to see how many funded games there are    
    console.log(fundedGames.length);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);    
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// Step 1: Filter unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length;


// create a string that explains the number of unfunded games using the ternary operator
// Step 2: Calculate total raised and create description string
const descriptionText = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, 
${numUnfundedGames} game${numUnfundedGames === 1 ? ' remains' : 's remain'} unfunded. We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
// Step 3: Create and append the new paragraph element
const descriptionParagraph = document.createElement("p");
descriptionParagraph.innerHTML = descriptionText;
descriptionContainer.appendChild(descriptionParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...restGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
//--> Create a new element for the top-funded game
const firstGameElement = document.createElement('p');
firstGameElement.textContent = `Top Game: ${firstGame.name}`;
//--> Append it to the first game container
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
//--> Create a new element for the second top-funded game
const secondGameElement = document.createElement('p');
secondGameElement.textContent = `Runner-Up: ${secondGame.name}`;
//--> Append it to the second game container
secondGameContainer.appendChild(secondGameElement);

/************************************************************************************
 * Other Functions:
 */

// Get the button element
const returnTopButton = document.getElementById('return-top');

// Show the button when the page is scrolled down
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        returnTopButton.classList.add('show');
    } else {
        returnTopButton.classList.remove('show');
    }
};

// Scroll to the top when the button is clicked
returnTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



// Search functionality
// Sample games data (you can replace this with real data or fetch it from an API)
/* const games = [
    { name: 'Game 1', description: 'An exciting action game' },
    { name: 'Game 2', description: 'A thrilling adventure game' },
    { name: 'Game 3', description: 'A relaxing puzzle game' },
    // Add more games here
  ]; */

const games= GAMES_JSON;

// Function to display games as cards
function displayGames(gamesToDisplay) {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = ''; // Clear existing games
    
    gamesToDisplay.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');
      
      gameCard.innerHTML = `
        <img src="${game.imageUrl}" alt="${game.name}" class="game-image">
        <div class="game-info">
          <h3 class="game-name">${game.name}</h3>
          <p class="game-description">${game.description}</p>
          <button class="fund-btn">Fund This Game</button>
        </div>
      `;
      
      gamesContainer.appendChild(gameCard);
    });
  }

  
// Search functionality
const searchInput = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');

// Handle the search input change
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    
    // Filter the games based on the search query
    const filteredGames = GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(query)
    );

    // Update the displayed games
    deleteChildElements(gamesContainer); // Clear current games
    addGamesToPage(filteredGames); // Add filtered games to the page
});

// Optional: Search when clicking the search button
searchButton.addEventListener('click', function() {
    const query = searchInput.value.toLowerCase();
    
    const filteredGames = GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(query)
    );

    deleteChildElements(gamesContainer); // Clear current games
    addGamesToPage(filteredGames); // Add filtered games to the page
});


/* 
document.getElementById("change-body-color-btn").addEventListener("click", function() {
    document.body.style.transition = "background-color 2s ease-in-out";
    document.body.style.backgroundColor = "#87CEFA"; // Light Blue
}); */

