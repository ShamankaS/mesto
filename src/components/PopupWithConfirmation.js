import Popup from './Popup.js';

export default class PopupSubmit extends Popup {
    constructor(popup) {
        super(popup);
        this._form = this._popup.querySelector('.popup__form');
    }

    submitHandler(f) {
        this._handleSubmit = f;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}
