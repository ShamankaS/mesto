export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._inputSelector = this._config.inputSelector;
        this._buttonSelector = this._config.submitButtonSelector;
        this._inactiveButtonClass = this._config.inactiveButtonClass;
        this._inputErrorClass = this._config.inputErrorClass;
        this._errorClass = this._config.errorClass;
        this._form = formElement;
        this._button = this._form.querySelector(this._buttonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    };

    _showInputError = item => {
        this._inputError = this._form.querySelector(`#error-${item.id}`);
        item.classList.add(this._inputErrorClass);
        this._inputError.classList.add(this._errorClass);
        this._inputError.textContent = item.validationMessage;
    };

    _hideInputError = item => {
        this._inputError = this._form.querySelector(`#error-${item.id}`);
        item.classList.remove(this._inputErrorClass);
        this._inputError.classList.remove(this._errorClass);
        this._inputError.textContent = '';
    };

    _checkInputValidity = item => {
        !item.validity.valid
            ? this._showInputError(item)
            : this._hideInputError(item);
    };

    _hasInvalidInput = () => this._inputList.some(item => !item.validity.valid);

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
        } else {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
        }
    };

    _setEventListeners = () => {
        this._toggleButtonState();
        this._form.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState();
            }, 0);
        });
        this._inputList.forEach(item => {
            item.addEventListener('input', () => {
                this._checkInputValidity(item);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._setEventListeners();
    };
}