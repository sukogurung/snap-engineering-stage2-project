import { pets } from './pets-data.js';

function showCards(petsToShow) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  petsToShow.forEach((pet) => {
    const templateCard = document.querySelector(".card");
    const nextCard = templateCard.cloneNode(true);
    nextCard.style.display = "block";

    const cardImage = nextCard.querySelector("img");
    cardImage.src = pet.image;
    cardImage.alt = pet.name;

    const cardTitle = nextCard.querySelector("h3");
    cardTitle.textContent = pet.name;

    const cardAge = nextCard.querySelector("p:nth-of-type(1)");
    cardAge.textContent = `Age: ${pet.age} ${pet.age === 1 ? "year" : "years"}`;

    const cardType = nextCard.querySelector("p:nth-of-type(2)");
    cardType.textContent = `Type: ${pet.type}`;

    const cardBreed = nextCard.querySelector("p:nth-of-type(3)");
    cardBreed.textContent = `Breed: ${pet.breed}`;

    const adoptButton = nextCard.querySelector("button:nth-of-type(1)");
    adoptButton.addEventListener("click", AdoptAlert);

    const removeButton = nextCard.querySelector("button:nth-of-type(2)");
    removeButton.addEventListener("click", () => removeThisCard(nextCard));

    cardContainer.appendChild(nextCard);
  });
}

function filterAndSortPets() {
  let filteredPets = filterPetsByType(pets, petTypeFilter.value);
  filteredPets = searchPetsByNameOrBreed(filteredPets, searchInput.value);
  filteredPets = sortPetsByAge(filteredPets, sortSelect.value);
  showCards(filteredPets);
}

function filterPetsByType(pets, type) {
  if (type === "all") return pets;
  return pets.filter((pet) => pet.type === type);
}

function searchPetsByNameOrBreed(pets, searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      pet.breed.toLowerCase().includes(lowerCaseSearchTerm)
  );
}

function sortPetsByAge(pets, sortOrder) {
  return pets.sort((a, b) =>
    sortOrder === "youngest" ? a.age - b.age : b.age - a.age
  );
}

function AdoptAlert() {
  console.log("Button Clicked!");
  alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
}

function removeThisCard(cardElement) {
  const cardContainer = document.getElementById("card-container");
  const petName = cardElement.querySelector("h3").textContent;

  const petIndex = pets.findIndex((pet) => pet.name === petName);
  if (petIndex !== -1) {
    pets.splice(petIndex, 1);
  }

  cardContainer.removeChild(cardElement);
}

document.addEventListener("DOMContentLoaded", () => {
    showCards(pets);
});

const petTypeFilter = document.getElementById("pet-type");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

petTypeFilter.addEventListener("change", filterAndSortPets);
searchInput.addEventListener("input", filterAndSortPets);
sortSelect.addEventListener("change", filterAndSortPets);