import './pages/index.css';
import * as validate from './components/validate.js';
import * as utils from "./components/utils";
import * as card from './components/card';

//Попапы
const profileAddButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');

profileAddButton.addEventListener('click', () => utils.openPopup(card.popupNewElemet));

//Закрытие попапов на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          utils.closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        utils.closePopup(popup)
      }
  });
});

validate.enableValidation();


