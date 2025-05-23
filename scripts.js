import { pets } from './pets-data.js';

// All Dom elements together
const modal = document.getElementById("pet-modal")
const modalContent = document.getElementById("modal-content")
const closeModal = document.getElementById("close-modal")
const petTypeFilter = document.getElementById("pet-type");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

// Function to show/render the card
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
    adoptButton.addEventListener("click", (e) => {
      e.stopPropagation();
      AdoptAlert();
    });

    const removeButton = nextCard.querySelector("button:nth-of-type(2)");
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      removeThisCard(nextCard);
    });

    nextCard.addEventListener("click", () => showPetDetails(pet))
    cardContainer.appendChild(nextCard);
  });
}

function filterAndSortPets() {
  let filteredPets = filterPetsByType(pets, petTypeFilter.value);
  filteredPets = searchPetsByNameOrBreed(filteredPets, searchInput.value);
  filteredPets = sortPetsByAge(filteredPets, sortSelect.value);
  showCards(filteredPets);
}

// Filter by Type
function filterPetsByType(pets, type) {
  if (type === "all") return pets;
  return pets.filter((pet) => pet.type === type);
  /*
  // without using .filter() method
  const filtered = [];
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].type === type) {
      filtered.push(pets[i]);
    }
  }
  return filtered;
  */
}

// Search by Name or Breed
function searchPetsByNameOrBreed(pets, searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      pet.breed.toLowerCase().includes(lowerCaseSearchTerm)
  );
   /*
  // without filter() and includes() methods
  const result = [];
  for (let i = 0; i < pets.length; i++) {
    const name = pets[i].name.toLowerCase();
    const breed = pets[i].breed.toLowerCase();

    if (name.indexOf(lowerCaseSearchTerm) !== -1 || breed.indexOf(lowerCaseSearchTerm) !== -1) {
      result.push(pets[i]);
    }
  }
  return result;
  */
}

// Sort by Age
function sortPetsByAge(pets, sortOrder) {
  return pets.sort((a, b) =>
    sortOrder === "youngest" ? a.age - b.age : b.age - a.age
  );
  /*
  // without .sort() method
  const petsCopy = [];
  for (let i = 0; i < pets.length; i++) {
    petsCopy.push(pets[i]);
  }

  for (let i = 0; i < petsCopy.length - 1; i++) {
    for (let j = 0; j < petsCopy.length - i - 1; j++) {
      const shouldSwap = sortOrder === "youngest"
        ? petsCopy[j].age > petsCopy[j + 1].age
        : petsCopy[j].age < petsCopy[j + 1].age;

      if (shouldSwap) {
        const temp = petsCopy[j];
        petsCopy[j] = petsCopy[j + 1];
        petsCopy[j + 1] = temp;
      }
    }
  }

  return petsCopy;
  */
}

function AdoptAlert() {
  console.log("Button Clicked!");
  alert(" * I guess I can kiss heaven goodbye, because it got to be a sin to look this good!\n * Do not count yourself out of an opportunity.\n * Fun Fact - Milo and Buddy are twins. Please adopt both."
  );
}

// Remove this card
function removeThisCard(cardElement) {
  const cardContainer = document.getElementById("card-container");
  const petName = cardElement.querySelector("h3").textContent;
  const petIndex = pets.findIndex((pet) => pet.name === petName);
  if (petIndex !== -1) {
    pets.splice(petIndex, 1);
  }
  cardContainer.removeChild(cardElement);

  /* without findIndex() and splice() method
  let indexToRemove = -1;
  for (let i = 0; i < pets.length; i++) {
    if (pets[i].name === petName) {
      indexToRemove = i;
      break;
    }
  }

  if (indexToRemove !== -1) {
    for (let i = indexToRemove; i < pets.length - 1; i++) {
      pets[i] = pets[i + 1];
    }
    pets.length = pets.length - 1;
  }

  cardContainer.removeChild(cardElement);
  */
}

// Function to show pet details in modal
function showPetDetails(pet) {
  modalContent.innerHTML = `
    <h2>${pet.name}</h2>
    <img src="${pet.image}" alt="${pet.name}">
    <p><strong>Age:</strong> ${pet.age} ${pet.age === 1 ? "year" : "years"}</p>
    <p><strong>Type:</strong> ${pet.type}</p>
    <p><strong>Breed:</strong> ${pet.breed}</p>
    <p><strong>Description:</strong> ${pet.description}</p>
    <button id="modal-adopt-btn">Adopt</button>
    <button id="modal-remove-btn">Remove</button>
  `;
  modal.style.display = "block";
  document.getElementById("modal-adopt-btn").addEventListener("click", () => {
    AdoptAlert();
  });

  document.getElementById("modal-remove-btn").addEventListener("click", () => {
    const allCards = document.querySelectorAll(".card");
    for (const card of allCards) {
      const title = card.querySelector("h3");
      if (title && title.textContent === pet.name) {
        removeThisCard(card);
        break;
      }
    }
    modal.style.display = "none";
  });
}

petTypeFilter.addEventListener("change", filterAndSortPets);
searchInput.addEventListener("input", filterAndSortPets);
sortSelect.addEventListener("change", filterAndSortPets);
closeModal.addEventListener("click", () => (modal.style.display = "none"))
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none"
  }
})

document.addEventListener("DOMContentLoaded", () => {
  showCards(pets);
});