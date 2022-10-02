import {openPopupFullScreen} from "./modal";
import {elementsTemplate} from './constant';

//Базовые карточки
export const initialCards = [
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

//Отобржение карточек
export function addingCards(title, image) {
  
  const template = elementsTemplate.content.cloneNode(true);
  const cardImage = template.querySelector('.element__image');
  cardImage.src = image;
  cardImage.alt = title;
  template.querySelector('.element__title').textContent = title;
  template.querySelector('.element__trash').addEventListener('click', deleteCard);
  template.querySelector('.element__like').addEventListener('click', puteLike);
  cardImage.addEventListener('click', () => openPopupFullScreen(title, image));

  return template;
}

//Удаление карточки
function deleteCard(event) {
  event.target.closest('.element').remove();
}

//Лайк карточки
function puteLike (event) {
  event.target.classList.toggle('element__like_active');
}
