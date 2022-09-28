export const settings = ({
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: '.popup__submit-button_disabled',
  inputErrorClass: '.popup__field_type_error',
  ErrorClass: '.popup__error_type_active'
});

//Показать ошибки
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.ErrorClass);
}

//Скрыть ошибки
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.ErrorClass);
  errorElement.textContent = '';
}

//Скрыть ошибки перед закрытием попапа
export function hideAllErrors(popup, settings) {
  const formElement = popup.querySelector(settings.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, settings));
}

//Проверка на наличе ошибок
function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

//Проверка формы
function isValid(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

//Переключение кнопок на Disabled
function controlButtonState(submitButton, inputList, settings) {
  if (isValid(inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}

//Отслеживание изменения состояния
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.inactiveButtonClass);
  controlButtonState(submitButton, inputList, settings);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      controlButtonState(submitButton, inputList, settings);
    });
  });
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  })
}