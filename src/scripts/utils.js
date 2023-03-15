import Card from './Card.js';

const handleEscape = evt => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_active'));
    };
};

const clickCloseOverlay = evt => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    };
};

const setCloseListeners = item => {
    document.addEventListener('keydown', handleEscape);
    item.addEventListener('mousedown', clickCloseOverlay);
};

const removeCloseListeners = item => {
    document.removeEventListener('keydown', handleEscape);
    item.removeEventListener('mousedown', clickCloseOverlay);
};

const openPopup = item => {
    item.classList.add('popup_active');
    setCloseListeners(item);
};

const closePopup = item => {
    removeCloseListeners(item);
    item.classList.remove('popup_active');
};

const renderCard = (data, template) => {
    const card = new Card(data, template);
    return card.createCard();
};

export {
    openPopup,
    closePopup,
    renderCard
};