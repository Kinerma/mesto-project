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
    fieldTitle,
    fieldUrl,
    newCards,
    popupNewElemet,
    popupAvatar,
    popupAvatarOpen,
    inputAvatar,
    profileAvatar,
    avatarForm, settings
} from './components/constant'
import * as api from './components/api';


let userId;

//Редактирование профиля
function openPopupEditProfile() {
    fieldName.value = profileTitle.textContent;
    fieldAbout.value = profileSubtitle.textContent;
    modal.openPopup(popupEditProfile);
}

function closePopupEditProfile(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    api.editProfileUser(fieldName.value, fieldAbout.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileSubtitle.textContent = res.about;
            modal.closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.error('Ошибка при сохранении профиля', err)
        })
        .finally(() => {
            event.submitter.textContent = 'Сохранить'
        });
}

//Редактирование аватара
function editProfileAvatar(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    api.updateAvatar(inputAvatar.value)
        .then((res) => {
            profileAvatar.src = res.avatar;
            modal.closePopup(popupAvatar);
        })
        .catch((err) => {
            console.error('Ошибка при загрузке аватар', err);
        })
        .finally(() => {
            event.submitter.textContent = 'Сохранить'
        });
}

//Добавление новых карточек
function addNewCards(event) {
    event.preventDefault();
    event.submitter.textContent = 'Сохранение...'
    api.createNewCards(fieldTitle.value, fieldUrl.value)
        .then((res) => {
            cards.addCardsDefolt(fieldTitle.value, fieldUrl.value, res._id, [], res.owner._id, userId);
            modal.closePopup(popupNewElemet);
            event.target.reset();
        })
        .catch((err) => {
            console.error('Ошибка при добавлении карточки', err)
        })
        .finally(() => {
            event.submitter.textContent = 'Создать'
        })
    validate.disabledButton(popupNewElemet);
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

validate.enableValidation(settings);

Promise.all([api.loadingProfileUser(), api.displayCards()])
    .then((res) => {
        profileTitle.textContent = res[0].name;
        profileSubtitle.textContent = res[0].about;
        profileAvatar.src = res[0].avatar;
        userId = res[0]._id;
        res[1].reverse().forEach((card) => {
            cards.addCardsDefolt(card.name, card.link, card._id, card.likes, card.owner._id, userId)
        })
    })
    .catch((err) => {
        console.error('Ошибка при получении данных от сервера', err);
    });

