const popupProfile = document.querySelector('#popup_type_profile');
const popupCard = document.querySelector('#popup_type_card');
const popupPicture = document.querySelector('.popup_type_picture');
const nameInput = document.querySelector('#input_type_name');
const introInput = document.querySelector('#input_type_intro');
const titleInput = document.querySelector('#input_type_title');
const linkInput = document.querySelector('#input_type_link');
const profileName = document.querySelector('.profile__name');
const profileIntro = document.querySelector('.profile__intro');
const elementsSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const openClosePopup = item => {
    item.classList.toggle('popup_active');
};

const deleteCard = evt => {
    evt.target.closest('.element').remove();
};

const likeCard = evt => {
    evt.target.classList.toggle('element__like_active');
};

const openPicture = (cardTitle, cardLink) => {
    popupImage.src = cardLink;
    popupImage.alt = cardTitle;
    popupCaption.textContent = `${cardTitle}`
    openClosePopup(popupPicture);
}

const createCard = cardData => {
    const cardTemplateCopy = cardTemplate.content.cloneNode(true)
    const cardImage = cardTemplateCopy.querySelector('.element__image');
    cardTemplateCopy.querySelector('.element__title').textContent = `${cardData.name}`;
    cardTemplateCopy.querySelector('.element__trash').addEventListener('click', deleteCard);;
    cardTemplateCopy.querySelector('.element__like').addEventListener('click', likeCard);
    cardImage.alt = cardData.name;
    cardImage.src = cardData.link;
    cardImage.addEventListener('click', () => openPicture(cardData.name, cardData.link));
    return cardTemplateCopy;
}

initialCards.forEach(item => {
    elementsSection.append(createCard(item));
});

document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openClosePopup(popupProfile);
    nameInput.value = `${profileName.textContent}`;
    introInput.value = `${profileIntro.textContent}`;
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    openClosePopup(popupCard);
    titleInput.value = '';
    linkInput.value = '';
});

document.querySelectorAll('.popup__close-button').forEach(item => {
    item.addEventListener('click', evt => {
        openClosePopup(evt.target.closest('.popup'));
    });
});

document.querySelector('#form_type_profile').addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileIntro.textContent = `${introInput.value}`;
    openClosePopup(popupProfile);
});

document.querySelector('#form_type_card').addEventListener('submit', evt => {
    evt.preventDefault();
    let infoInput = {
        name: titleInput.value,
        link: linkInput.value
    };
    elementsSection.prepend(createCard(infoInput));
    openClosePopup(popupCard);
});