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
    popupNewElemet,
    popupAvatar,
    popupAvatarOpen,
    inputAvatar,
    profileAvatar,
    avatarForm
} from './components/constant'

import {createNewCards, editProfileUser, updateAvatar} from "./components/api";


//Редактирование профиля
function openPopupEditProfile() {
    fieldName.value = profileTitle.textContent;
    fieldAbout.value = profileSubtitle.textContent;
    modal.openPopup(popupEditProfile);
}

function closePopupEditProfile(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    editProfileUser(fieldName.value, fieldAbout.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileSubtitle.textContent = res.about;
        })
        .catch((err) => {
            console.log('Ошибка при сохранении профиля', err)
        })
        .finally(() => {
            event.submitter.textContent = 'Сохранить'
        });
    modal.closePopup(popupEditProfile);
}

//Редактирование аватара
function editProfileAvatar(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    updateAvatar(inputAvatar.value)
        .then((res) => {
            profileAvatar.src = res.avatar;
        })
        .catch((err) => {
            console.log('Ошибка при загрузке аватар', err);
        })
        .finally(() => {
            event.submitter.textContent = 'Сохранить'
            event.target.reset();
        });
    modal.closePopup(popupAvatar);
}

//Добавление новых карточек
function addNewCards(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    elementsSection.prepend(cards.addingCards(fieldTitle.value, fieldUrl.value));
    newCards.reset();
    modal.closePopup(popupNewElemet);
    validate.disabledButton(popupNewElemet);
}

//Добавление дефолтных карточек
function addCardsDefolt(templates) {
    templates.forEach(function (element) {
        const card = cards.addingCards(element.name, element.link);
        elementsSection.append(card);
    });
}

profileEditButton.addEventListener('click', function () {
    openPopupEditProfile();
});

popupForm.addEventListener('submit', closePopupEditProfile);
avatarForm.addEventListener('submit', editProfileAvatar);

//Открытие карточки
profileAddButton.addEventListener('click', function () {
    modal.openPopup(popupNewElemet);
    validate.disabledButton(popupNewElemet);
});
//Открытие аватара
popupAvatarOpen.addEventListener('click', function () {
   modal.openPopup(popupAvatar);
   validate.disabledButton(popupAvatar);
});

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


