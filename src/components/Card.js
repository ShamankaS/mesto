export default class Card {
    constructor(data, template, handleCardClick, handleLikeClick, handleDislikeClick, handleTrashClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._userId = data.userId;
        this._id = data.id;
        this._ownerId = data.ownerId;
        this._template = template;
        this._openCard = handleCardClick;
        this._like = handleLikeClick;
        this._dislike = handleDislikeClick;
        this._deleteCard = handleTrashClick;
    }

    _getTemplate = () => {
        const cardTemplate = document.querySelector(this._template).content.cloneNode(true);
        return cardTemplate;
    }

    _isLiked() {
        this.dislike();
        this._likes.forEach((item) => {
            if (item._id === this._userId) {
                this.like();
            }
        })
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('element__like_active')) {
                this._dislike();
            } else {
                this._like();
            };
        });
        this._deleteButton.addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        this._image.addEventListener('click', () => {
            this._openCard(this._name, this._link);
        });
    }

    createCard = () => {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._deleteButton = this._element.querySelector('.element__trash');
        this._likeButton = this._element.querySelector('.element__like');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._likeCounter.textContent = `${this._likes.length}`;
        this._setEventListeners();
        this._isLiked();
        this.isOwner();
        return this._element;
    }

    like() {
        this._likeButton.classList.add('element__like_active');
    }

    dislike() {
        this._likeButton.classList.remove('element__like_active');
    }

    setLikesCount(res) {
        this._likeCounter.textContent = `${res.likes.length}`;
    }

    isOwner() {
        if (this._userId !== this._ownerId) {
            this._deleteButton.remove();
            this._deleteButton = null;
        }
    }
}