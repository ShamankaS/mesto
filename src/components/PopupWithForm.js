import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, handleSubmit) {
        super(popup);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.form__input');
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
            this._handleSubmit(this._getInputValues());
        });
    }

    close = () => {
        super.close();
        this._form.reset();
    }
}