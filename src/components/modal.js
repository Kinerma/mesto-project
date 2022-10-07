import {
  popupFullScreen,
  popupImage,
  popupCaption
} from './constant';

//Открытие попапов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}
//Закрытие на Escape
export function handleEscClose(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//Закрытие попапа
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}
//Открытие карточки в Full-Screen
export function openPopupFullScreen(title, image) {
  popupImage.src = image;
  popupImage.alt = title;
  popupCaption.textContent = title;
  openPopup(popupFullScreen);
}

