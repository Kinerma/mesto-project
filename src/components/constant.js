
//Export in index.js
export const profileAddButton = document.querySelector('.profile__add-button');
export const popups = document.querySelectorAll('.popup');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupAvatar = document.querySelector('.popup__avatar');
export const popupAvatarOpen = document.querySelector('.profile__avatars');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const fieldName = document.querySelector('.popup__type_field_name');
export const fieldAbout = document.querySelector('.popup__type_field_about');
export const popupForm = document.querySelector('.popup__new-edit-form');
export const avatarForm = popupAvatar.querySelector('.popup__new-avatar');

export const elementsSection = document.querySelector('.elements');

export const fieldTitle = document.querySelector('.popup__type_field_title');
export const fieldUrl = document.querySelector('.popup__type_field_url');
export const newCards = document.querySelector('.popup__new-cards');
export const popupNewElemet = document.querySelector('.popup_type_new-elemet');


export const inputAvatar = document.querySelector('.popup__type_field_avatar');
export const profileAvatar = document.querySelector('.profile__avatar');

//Export in modal.js
export const popupFullScreen = document.querySelector('.popup_type_full-screen');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');

//Export in card.js
export const elementsTemplate = document.querySelector('#templates').content;

//Export in validate.js
export const settings = {
    submitButtonPopup: '.popup__submit-button',
    inactiveButton: 'popup__submit-button_inactive',
    formSelector: '.popup__edit-form',
    formInput: '.popup__field-error',
    formError: 'popup__field_type_error',
    formErrorActive: 'popup__field-error_active',
    formField: '.popup__field',
    formPopup: '.popup__form'
}

