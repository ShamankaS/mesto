const showInputError = (config, formElement, formInput, errorMessage) => {
    const formError = formElement.querySelector(`#error-${formInput.id}`);
    formInput.classList.add(config.inputErrorClass);
    formError.classList.add(config.errorClass);
    formError.textContent = errorMessage;
};

const hideInputError = (config, formElement, formInput) => {
    const formError = formElement.querySelector(`#error-${formInput.id}`);
    formInput.classList.remove(config.inputErrorClass);
    formError.classList.remove(config.errorClass);
    formError.textContent = '';
};

const checkInputValidity = (config, formElement, formInput) => {
    if (!formInput.validity.valid) {
        showInputError(config, formElement, formInput, formInput.validationMessage);
    } else {
        hideInputError(config, formElement, formInput);
    }
};

const hasInvalidInput = formInputList => {
    return formInputList.some(item => {
        return !item.validity.valid;
    });
};

const toggleButtonState = (config, formInputList, buttonElement) => {
    if (hasInvalidInput(formInputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (config, formElement) => {
    const formInputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, formInputList, buttonElement);
    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(config, formInputList, buttonElement);
        }, 0);
    });
    formInputList.forEach(item => {
        item.addEventListener('input', () => {
            checkInputValidity(config, formElement, item);
            toggleButtonState(config, formInputList, buttonElement);
        });
    });
};

const enableValidation = config => {
    const formElementList = Array.from(document.querySelectorAll(config.formSelector));
    formElementList.forEach(item => {
        setEventListeners(config, item);
    });
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
};

enableValidation(validationConfig);