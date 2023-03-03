import {
    openPopup
} from './utils.js';
import {
    popupImage,
    popupCaption,
    popupPicture
} from './constants.js';

export default class Card {
    constructor(data, template) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    };

    _getTemplate = () => {
        const cardTemplate = document.querySelector(this._template).content.cloneNode(true);
        return cardTemplate;
    };

    _deleteCard = evt => {
        evt.target.closest('.element').remove();
    };

    _toggleLike = evt => {
        evt.target.classList.toggle('element__like_active');
    };

    _openPicture = () => {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = `${this._name}`;
        openPopup(popupPicture);
    };

    _setEventListeners = () => {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPicture();
        });
    };

    createCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._image = this._element.querySelector('.element__image');
        this._element.querySelector('.element__title').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
        return this._element;
    };
}