import './pages/index.css';
import * as validate from './components/validate.js';
import * as modal from "./components/modal";
import * as cards from './components/card';
import {
    profileAddButton,
    popups,
    popupEditProfile,
    profileEditButton,
    profileTitle,
    profileSubtitle,
    fieldName,
    fieldAbout,
    popupForm,
    elementsSection,
    fieldTitle,
    fieldUrl,
    newCards,
    popupNewElemet
} from './components/constant'

//Редактирование профиля
function openPopupEditProfile() {
    fieldName.value = profileTitle.textContent;
    fieldAbout.value = profileSubtitle.textContent;
    modal.openPopup(popupEditProfile);
}

function closePopupEditProfile(event) {
    event.preventDefault();
    profileTitle.textContent = fieldName.value;
    profileSubtitle.textContent = fieldAbout.value;
    modal.closePopup(popupEditProfile);
}

//Добавление новых карточек
function addNewCards(event) {
    event.preventDefault();
    elementsSection.prepend(cards.addingCards(fieldTitle.value, fieldUrl.value));
    newCards.reset();
    modal.closePopup(popupNewElemet);
}

//Добавление дефолтных карточек
function addCardsDefolt(templates) {
    templates.forEach(function (element) {
        const card = cards.addingCards(element.name, element.link);
        elementsSection.append(card);
    });
}

profileEditButton.addEventListener('click', () => openPopupEditProfile());
popupForm.addEventListener('submit', closePopupEditProfile);
profileAddButton.addEventListener('click', () => modal.openPopup(popupNewElemet));
addCardsDefolt(cards.initialCards);
newCards.addEventListener('submit', addNewCards);

//Закрытие попапов на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          modal.closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        modal.closePopup(popup)
      }
  });
});

validate.enableValidation();


