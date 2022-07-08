import {Card} from "./Card.js";
import {initialCards} from "./cardsInfo.js";
import {FormValidator} from "./FormValidator.js";
import Section from "../conponents/Section.js";

const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_new-card');
const inputName = profilePopup.querySelector('#profile-name');
const inputJob = profilePopup.querySelector('#profile-job');
const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__occupation'); // Работа в профиле
const cardListSelector = '.elements';
const profileForm = profilePopup.querySelector('.popup__form');
const profileEditBtn = document.querySelector('#profileEditBtn');
const profilePopupCloseBtn = profilePopup.querySelector('#profileFormCloseBtn');
const inputTitle = cardPopup.querySelector('#newCardTitle');
const inputSource = cardPopup.querySelector('#newCardSource');
const cardForm = cardPopup.querySelector('.popup__form');
const newCardCloseBtn = cardPopup.querySelector('#newCardCloseBtn');
const cardAddBtn = document.querySelector('#cardAddBtn');
const popupList = Array.from(document.querySelectorAll('.popup'));
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseBtn = imagePopup.querySelector('#imageCloseBtn');


const validationConfig = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

// Закрытие popup через Esc
const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}


const defaultCardList = new Section({
    items: initialCards,
    renderer: ({name, link}) => {
        const card = createCard(name, link);
        defaultCardList.addItem(card);
    }
}, cardListSelector);

// Функция создания карточки
const createCard = (name, link) => {
    const newCard = new Card(name, link, '#card');
    return newCard.generateCard();
}

defaultCardList.renderItems();

// // Функция добавления карточки в DOM
// const renderCard = (name, link) => {
//     const newCard = createCard(name, link);
//     cardList.prepend(newCard);
// }
//
// // Создаем начальные карточки и добавляем в DOM
// initialCards.forEach(({name, link}) => {
//     renderCard(name, link);
// });

// Сохранение профиля
profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(profilePopup);
})

// Кнопка редактирования профиля
profileEditBtn.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    profileValidation.enableButton();
    openPopup(profilePopup);
})

// Кнопка закрытия попапа редактирования профиля
profilePopupCloseBtn.addEventListener('click', () => {
    closePopup(profilePopup);
})

// для Добавления Карточек
cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = createCard(inputTitle.value, inputSource.value);
    defaultCardList.addItem(newCard);
    cardForm.reset();
    newCardValidation.disableButton();
    closePopup(cardPopup);
})

// Кнопка закрытия попапа добавления новой карточки
newCardCloseBtn.addEventListener('click', () => {
    closePopup(cardPopup);
})

// Добавление новой карточки
cardAddBtn.addEventListener('click', () => {
    openPopup(cardPopup);
})

// Закрытие popup нажатием на overlay
const overlayClosePopup = (popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
}

popupList.forEach((curPopup) => {
    overlayClosePopup(curPopup);
})


// Кнопка закрытия попапа с картинкой
imageCloseBtn.addEventListener('click', () => {
    closePopup(imagePopup);
})

// Валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
const newCardValidation = new FormValidator(validationConfig, cardForm);
profileValidation.setValidation();
newCardValidation.setValidation();