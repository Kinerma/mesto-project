
//Покажем элемент ошибки
import {settings} from "./constant";

export const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.formError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.formErrorActive);
}

//Скроем элемент ошибки
export const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.formError);
  errorElement.classList.remove(settings.formErrorActive);
  errorElement.textContent = "";
}

export const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.formField));
  const buttonElement = formElement.querySelector(settings.submitButtonPopup);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formPopup));
  formList.forEach((formElement) => {
      setEventListeners(formElement, settings);
    });
};

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButton);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButton);
    buttonElement.removeAttribute("disabled", true);
  }
}

//Проверяем валидность поля
export const isValid = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

//Делать кнопку неактивной после добавления новой карточки
export function disabledButton(popup, settings) {
  const button = popup.querySelector(settings.submitButtonPopup);
  button.classList.add(settings.inactiveButton);
  button.setAttribute('disabled', 'disabled');
}
