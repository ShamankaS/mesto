const popupProfile = document.querySelector('#popup_type_profile');
const popupCard = document.querySelector('#popup_type_card');

const nameInput = document.querySelector('.input_type_name');
const introInput = document.querySelector('.input_type_intro');
const profileName = document.querySelector('.profile__name');
const profileIntro = document.querySelector('.profile__intro');

const titleInput = document.querySelector('.input_type_title');
const linkInput = document.querySelector('.input_type_link');

const elementsSection = document.querySelector('.elements');

const deleteCard = evt => {
    evt.target.closest('.element').remove();
};

const likeCard = evt => {
    evt.target.classList.toggle('element__like_active');
};

const openPicture = evt => {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    popupImage.src = evt.target.src;
    popupCaption.textContent = `${evt.target.alt}`
    const popupPicture = document.querySelector('.popup_type_picture').classList.add('popup_active');
}

const cardCreate = (cardTitle, cardLink) => {
    const cardTemplate = document.querySelector('#template').content.cloneNode(true);
    const cardImage = cardTemplate.querySelector('.element__image');
    cardImage.alt = `${cardTitle}`;
    cardImage.src = `${cardLink}`;
    const cardName = cardTemplate.querySelector('.element__title');
    cardName.textContent = `${cardTitle}`;
    const deleteIcon = cardTemplate.querySelector('.element__trash').addEventListener('click', deleteCard);
    const likeIcon = cardTemplate.querySelector('.element__like').addEventListener('click', likeCard);
    cardImage.addEventListener('click', openPicture);
    return cardTemplate;
}

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(item => {
    const card = cardCreate(item.name, item.link);
    elementsSection.append(card);
});

const openPopup = item => {
    item.classList.add('popup_active');
};

const popupProfileButton = document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopup(popupProfile);
    nameInput.value = `${profileName.textContent}`;
    introInput.value = `${profileIntro.textContent}`;
});

const popupCardButton = document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup(popupCard);
    titleInput.value = '';
    linkInput.value = '';
});

const closePopup = evt => {
    evt.target.closest('.popup').classList.remove('popup_active');
};

const closeIcons = document.querySelectorAll('.popup__close-button');
closeIcons.forEach(item => {
    item.addEventListener('click', closePopup);
})

const submitProfile = document.querySelector('.form_type_profile').addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = `${nameInput.value}`;
    profileIntro.textContent = `${introInput.value}`;
    closePopup(evt);
});

const submitCard = document.querySelector('.form_type_card').addEventListener('submit', evt => {
    evt.preventDefault();
    const newCard = cardCreate(titleInput.value, linkInput.value);
    elementsSection.prepend(newCard);
    closePopup(evt);
});