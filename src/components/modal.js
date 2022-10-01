
import {closePopup, openPopup} from "./utils";

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupFullScreen = document.querySelector('.popup_type_full-screen');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//Импуты
const fieldName = document.querySelector('.popup__type_field_name');
const fieldAbout = document.querySelector('.popup__type_field_about');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popupForm = document.querySelector('.popup__new-edit-form');

//Редактирование профиля
function openPopupEditProfile() {
  fieldName.value = profileTitle.textContent;
  fieldAbout.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
}

function closePopupEditProfile(event) {
  event.preventDefault();
  profileTitle.textContent = fieldName.value;
  profileSubtitle.textContent = fieldAbout.value;
  closePopup(popupEditProfile);
}

//Открытие карточки в Full-Screen
export function openPopupFullScreen(title, image) {
  popupImage.src = image;
  popupImage.alt = title;
  popupCaption.textContent = title;
  openPopup(popupFullScreen);
}

profileEditButton.addEventListener('click', () => openPopupEditProfile());
popupForm.addEventListener('submit', closePopupEditProfile);