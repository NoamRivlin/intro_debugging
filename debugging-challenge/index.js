import characters from '../data/harry_potter/characters.json' assert { type: 'json' };

const characterContainer = document.getElementById('main');

/* NO NEED TO CHANGE  */
const cleanCardContainer = () => {
  characterContainer.innerHTML = '';
};

const createCards = (characters) => {
  cleanCardContainer();

  if (characters.length === 0) {
    const textElement = document.createElement('p');
    const text = document.createTextNode('No character matches the filter');
    textElement.appendChild(text);
    characterContainer.appendChild(textElement);
    return;
  }

  characters.forEach((character, index) => {
    const { name, image, house, species, gender } = character;
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.setAttribute('src', image);

    const mainCardContainer = document.createElement('div');
    mainCardContainer.classList.add('card-container');

    const logo = document.createElement('img');
    logo.setAttribute('src', `./assets/${house}.webp`);

    const textContainer = document.createElement('div');
    textContainer.classList.add('card-text-container');

    const titleElement = document.createElement('h2');
    const titleText = document.createTextNode(name);
    titleElement.appendChild(titleText);

    const speciesElement = document.createElement('span');
    speciesElement.classList.add(`tag`);
    const speciesText = document.createTextNode(species);
    speciesElement.appendChild(speciesText);

    const genderElement = document.createElement('span');
    const genderText = document.createTextNode(gender);
    genderElement.classList.add(`tag-${gender}`);
    genderElement.classList.add(`tag`);
    genderElement.appendChild(genderText);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    const button = document.createElement('button');
    const buttonText = document.createTextNode('Choose');
    button.classList.add(`choose-button`);
    button.setAttribute('id', `${index}`);
    button.appendChild(buttonText);
    buttonContainer.appendChild(button);

    card.appendChild(img);

    card.appendChild(mainCardContainer);

    mainCardContainer.appendChild(textContainer);
    if (character.house) {
      mainCardContainer.appendChild(logo);
    }
    if (characters.length !== 1) {
      card.appendChild(buttonContainer);
    }
    textContainer.appendChild(titleElement);
    textContainer.appendChild(speciesElement);
    textContainer.appendChild(genderElement);

    characterContainer.appendChild(card);
  });
};

createCards(characters);

/* ABOVE HERE, DO NOT CHANGE */

/* FROM HERE, ALL CODE BELOW CAN BE CHANGED AND REFACTORED */

const chooseRandomButton = document.getElementById('choose-random');

chooseRandomButton.addEventListener('click', () => {
  // let random;
  // if (!random) {
  const random = Math.floor(Math.random() * characters.length);
  // }
  createCards([characters[random]]);
});

// insert choosebuttons inside whats beteen comments into a function and call it each time you render cards
const chooseButtons = Array.from(
  document.getElementsByClassName('choose-button')
);

chooseButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    console.log([characters[e.target.id]]);
    createCards([characters[e.target.id]]);
  });
});
//

const selects = document.getElementsByTagName('select');
// console.log([...selects]);
const resetButton = document.getElementById('reset-button');
const reset = () => {
  console.log(...selects);
  [...selects].forEach((select) => {
    select.value = 'all';
  });
  createCards(characters);
};

resetButton.addEventListener('click', reset);

const filterButton = document.getElementById('filter-button');
//after filtering (if you fixed the choose buttons)
//if you choose someone it still picks from the usual characters
// so if you filtered and choose the first charater it'll present Harry
//need to have the new filtered array accessiable to choose card
//so the e.target.id will match and not give from the original characters array
const filter = () => {
  // let filtered = [];

  let filtered = characters.filter((character) => {
    const newArr = Array.from(selects).map((select) => {
      // if (select.value.toLowerCase() === 'all') {
      //   return true;
      // }
      return (
        select.value.toLowerCase() === 'all' ||
        character[select.name].toLowerCase() === select.value.toLowerCase()
      );
    });
    console.log(newArr);
    return !newArr.includes(false);
  });

  //ending up with 3 array leads to unresolve problems
  // Array.from(selects).forEach((select) => {
  //   filtered.push(
  //     characters.filter((character) => {
  //       return (
  //         character[select.name].toLowerCase() === select.value.toLowerCase()
  //       );
  //     })
  //   );
  // filtered = characters.filter((character) => {
  //   return character[select.name].toLowerCase() === select.value;
  // });
  //   console.log(filtered);
  // });
  createCards(filtered);
};

filterButton.addEventListener('click', filter);
