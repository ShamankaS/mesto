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

const openPopup = item => {
    item.classList.add('popup_active');
};

const closePopup = item => {
    item.classList.remove('popup_active');
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
    openPopup(popupPicture);
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
    openPopup(popupProfile);
    nameInput.value = `${profileName.textContent}`;
    introInput.value = `${profileIntro.textContent}`;
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup(popupCard);
    titleInput.value = '';
    linkInput.value = '';
});

document.querySelectorAll('.popup__close-button').forEach(item => {
    const popup = item.closest('.popup');
    item.addEventListener('click', () => closePopup(popup));
});

document.querySelector('#form_type_profile').addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileIntro.textContent = `${introInput.value}`;
    closePopup(popupProfile);
});

document.querySelector('#form_type_card').addEventListener('submit', evt => {
    evt.preventDefault();
    const infoInput = {
        name: titleInput.value,
        link: linkInput.value
    };
    elementsSection.prepend(createCard(infoInput));
    closePopup(popupCard);
});