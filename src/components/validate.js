import {settings} from './constant';

//Покажем элемент ошибки
export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.formError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.formErrorActive);
}

//Скроем элемент ошибки
export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.formError);
  errorElement.classList.remove(settings.formErrorActive);
  errorElement.textContent = "";
}

export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.formField));
  const buttonElement = formElement.querySelector(settings.submitButtonPopup);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formPopup));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(settings.formSelector));
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButton);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButton);
    buttonElement.removeAttribute("disabled", true);
  }
}

//Проверяем валидность поля
export const isValid = (formElement, inputElement) => {
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
