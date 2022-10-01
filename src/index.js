import './pages/index.css';

//Попапы
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewElemet = document.querySelector('.popup_type_new-elemet');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupFullScreen = document.querySelector('.popup_type_full-screen');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');

//Закрытие попапов
const cleansingList = document.querySelectorAll('.popup__close-button');

//Карточки
const elementsSection = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#templates').content;

//Редактирование профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Формы
const popupForm = document.querySelector('.popup__new-edit-form');
const newCards = document.querySelector('.popup__new-cards');

//Сохранение форм
const buttonSubmit = popupEditProfile.querySelector('.popup__submit-button');

//Импуты
const fieldName = document.querySelector('.popup__type_field_name');
const fieldAbout = document.querySelector('.popup__type_field_about');
const fieldTitle = document.querySelector('.popup__type_field_title');
const fieldUrl = document.querySelector('.popup__type_field_url');

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

//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}
profileEditButton.addEventListener('click', () => openPopupEditProfile());
profileAddButton.addEventListener('click', () => openPopup(popupNewElemet));

//Закрытие на Escape
function keyHandler(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

//Закрытие попапов на овелей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  });
});

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
popupForm.addEventListener('submit', closePopupEditProfile);

//Добавление новых карточек
function addNewCards(event) {
  event.preventDefault();
  elementsSection.prepend(addingCards(fieldTitle.value, fieldUrl.value));
  newCards.reset();
  closePopup(popupNewElemet);
}
newCards.addEventListener('submit', addNewCards);

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
addCardsDefolt(initialCards);

//Удаление карточки
function deleteCard(event) {
  event.target.closest('.element').remove();
}

//Лайк карточки
function puteLike (event) {
  event.target.classList.toggle('element__like_active');
}

//Открытие карточки в Full-Screen
function openPopupFullScreen(title, image) {
  popupImage.src = image;
  popupImage.alt = title;
  popupCaption.textContent = title;
  openPopup(popupFullScreen);
}

//____________________________________________________________________________________________________________________________________________________________________\\

//Валидация
const submitButtonPopup = 'popup__submit-button';
const formElement = document.querySelector('.popup__edit-form');
const formInput = formElement.querySelector('.popup__field-error');
const formError = formElement.querySelector(`.${formInput.id}-error`);

//Покажем элемент ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_active');
}

//Скроем элемент ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__field-error_active');
  errorElement.textContent = "";
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector(`.${submitButtonPopup}`);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(".popup__edit-form"));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-button_inactive");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__submit-button_inactive");
    buttonElement.removeAttribute("disabled", true);
  }
}

//Проверяем валидность поля
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
