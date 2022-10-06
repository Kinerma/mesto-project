import {openPopupFullScreen} from "./modal";
import {elementsSection, elementsTemplate,} from './constant';
import * as api from "./api";


//Получение данных по карточкам
export  function addCardsDefolt(name, link, cardId, likes, ownerId, userId) {
  const element = addingCards(name, link, cardId, likes, ownerId, userId);
  elementsSection.prepend(element);
}

//Отобржение карточек
export function addingCards(name, link, cardId, likes, ownerId, userId) {
  
  const template = elementsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = template.querySelector('.element__image');
  const cardDelete = template.querySelector('.element__trash');
  const likeElement = template.querySelector('.element__like');
  const likeCounter = template.querySelector('.element__like-counter');

  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  template.querySelector('.element__title').textContent = name;

  likeElement.addEventListener('click', (event) => puteLike(cardId, event));
  if (ownerId === userId) {
    cardDelete.addEventListener('click', (event) => deleteCard(cardId, event));
  } else {
    cardDelete.remove();
  }
  cardImage.addEventListener('click', () => openPopupFullScreen(name, link));
  template.id = cardId;
  likeCounter.textContent = likes.length;
  if (likes.some((like) => {
    return like._id === userId;
  })) {
    likeElement.classList.add('.element__like_active');
  }

  return template;
}

//Удаление карточки
function deleteCard(cardId, event) {
  api.deletedCards(cardId)
      .then(() => {
        event.target.closest('.element').remove();
      })
      .catch((err) => {
        console.error(`Не удалось удалить карточку ${err}`);
      });
}

//Передача лайка на сервер
function processALike(cardId, likeCounter) {
    document.getElementById(cardId).querySelector('.element__like-counter').textContent = likeCounter;
}

//Лайк карточки
function likeTheCard(cardId, event) {
  api.puteLikeCards(cardId)
      .then((res) => {
        event.target.classList.add('element__like_active');
        processALike(cardId, res.likes.length)
      })
      .catch((err) => {
        console.error(`Ошибка, не удается поставить лайк. ${err}`);
      })
}
//Удаление лайка
function deleteLike(cardId, event) {
  api.deleteLikeCards(cardId)
      .then((res) => {
        event.target.classList.remove('element__like_active');
        processALike(cardId, res.likes.length)
      })
      .catch((err) => {
        console.error(`Ошибка, не удается удалить лайк ${err}`);
      });
}

//Лайк карточки
function puteLike (cardId, event) {
  if (!event.target.classList.contains('element__like_active')) {
      likeTheCard(cardId, event);
  } else {
      deleteLike(cardId, event);
  }
}
