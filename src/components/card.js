

import {openPopupFullScreen} from "./modal";
import {closePopup} from "./utils";

const elementsSection = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#templates').content;

const fieldTitle = document.querySelector('.popup__type_field_title');
const fieldUrl = document.querySelector('.popup__type_field_url');
const newCards = document.querySelector('.popup__new-cards');
export const popupNewElemet = document.querySelector('.popup_type_new-elemet');
//Базовые карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Добавление новых карточек
function addNewCards(event) {
  event.preventDefault();
  elementsSection.prepend(addingCards(fieldTitle.value, fieldUrl.value));
  newCards.reset();
  closePopup(popupNewElemet);
}

//Отобржение карточек
function addingCards(title, image) {
  
  const template = elementsTemplate.cloneNode(true);
  const cardImage = template.querySelector('.element__image');
  cardImage.src = image;
  cardImage.alt = title;
  template.querySelector('.element__title').textContent = title;
  template.querySelector('.element__trash').addEventListener('click', deleteCard);
  template.querySelector('.element__like').addEventListener('click', puteLike);
  cardImage.addEventListener('click', () => openPopupFullScreen(title, image));

  return template;
}

//Добавление дефолтных карточек
function addCardsDefolt(templates) {
  templates.forEach(function (element) {
    const card = addingCards(element.name, element.link);
    elementsSection.append(card);
  });
}

//Удаление карточки
function deleteCard(event) {
  event.target.closest('.element').remove();
}

//Лайк карточки
function puteLike (event) {
  event.target.classList.toggle('element__like_active');
}
addCardsDefolt(initialCards);
newCards.addEventListener('submit', addNewCards);