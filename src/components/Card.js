export default class Card {
    constructor(data, template, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
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

    _setEventListeners = () => {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._element.querySelector('.element__trash').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    createCard = () => {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
    };
}