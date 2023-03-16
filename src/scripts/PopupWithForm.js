import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._submitButton = this._popup.querySelector('.form__submit');
    }

    _getInputValues = () => {
        this._inputValues = {};
        this._inputList.forEach(item => {
            this._inputValues[item.name] = item.value;
        });
        return this._inputValues;
    }

    setInputValue = (data) => {
        this._inputList.forEach(item => {
            item.value = data[item.name];
        })
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }

    close = () => {
        super.close();
        this._form.reset();
    }

    open = () => {
        super.open();
        this._submitButton.disabled = true;
    }
}


