import { pets } from './pets-data.js'

// Shows all the pet cats on the web page
function showCards(petsToShow) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  petsToShow.forEach((pet) => {
    const templateCard = document.querySelector(".card");
    const nextCard = templateCard.cloneNode(true);
    nextCard.innerHTML = `
      <div class="card-content">
        <img src="${pet.image}" alt="${pet.name}">
        <h3>${pet.name}</h3>
        <p>Age: ${pet.age} ${pet.age === 1 ? "year" : "years"}</p>
        <p>Type: ${pet.type}</p>
        <p>Breed: ${pet.breed}</p>
      </div>
      <button onclick="quoteAlert();">Adopt</button>
      <button onclick="removeLastCard();">Remove A Card!</button>
      `;
    editCardContent(nextCard, pet.name, pet.image, pet.age, pet.type, pet.breed); 
    cardContainer.appendChild(nextCard); 
  });
}

// Edits all the card content for the pets
function editCardContent(card, newTitle, newImageURL) {
  card.style.display = "block";
  const cardHeader = card.querySelector("h3");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards(pets));

// Filter, Search and Sorts
function filterAndSortPets() {

  // Filter by type

  // Search by Name

  //Sort by Age
}

// Adopt Alert!
function AdoptAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

// Remove this particular card
function removeThisCard() {
  titles.pop(); 
  showCards(pets); // Call showCards again to refresh
}
