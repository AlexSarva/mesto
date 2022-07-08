import {Card} from "./Card.js";
import {initialCards} from "./cardsInfo.js";
import {FormValidator} from "./FormValidator.js";
import Section from "../conponents/Section.js";
import Popup from "../conponents/Popup.js";
import PopupWithImage from "../conponents/PopupWithImage.js";

const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupSelector = '.popup_type_profile';
const cardPopup = document.querySelector('.popup_type_new-card');
const cardPopupSelector = '.popup_type_new-card';
const inputName = profilePopup.querySelector('#profile-name');
const inputJob = profilePopup.querySelector('#profile-job');
const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__occupation'); // Работа в профиле
const cardListSelector = '.elements';
const profileForm = profilePopup.querySelector('.popup__form');
const profileEditBtn = document.querySelector('#profileEditBtn');
const inputTitle = cardPopup.querySelector('#newCardTitle');
const inputSource = cardPopup.querySelector('#newCardSource');
const cardForm = cardPopup.querySelector('.popup__form');
const cardAddBtn = document.querySelector('#cardAddBtn');
const imagePopupSelector = '.popup_type_image';


const validationConfig = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

const profilePopupKek = new Popup(profilePopupSelector);
const cardPopupKek = new Popup(cardPopupSelector);
const imagePopupKek = new PopupWithImage(imagePopupSelector);

// Функция создания карточки
const createCard = (name, link) => {
    const newCard = new Card({
            name: name,
            link: link,
        handleCardClick: (name, link) => {
                imagePopupKek.open(name, link);
            }
            },
        '#card'
        );
    return newCard.generateCard();
}


// Сохранение профиля
profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    profilePopupKek.close();
})

// Кнопка редактирования профиля
profileEditBtn.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    profileValidation.enableButton();
    profilePopupKek.open();
})

// для Добавления Карточек
cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = createCard(inputTitle.value, inputSource.value);
    defaultCardList.addItem(newCard);
    cardForm.reset();
    newCardValidation.disableButton();
    cardPopupKek.close();
})

// Добавление новой карточки
cardAddBtn.addEventListener('click', () => {
    cardPopupKek.open();
})


const defaultCardList = new Section({
    items: initialCards,
    renderer: ({name, link}) => {
        const card = createCard(name, link);
        defaultCardList.addItem(card);
    }
}, cardListSelector);
defaultCardList.renderItems();

// Валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
const newCardValidation = new FormValidator(validationConfig, cardForm);
profileValidation.setValidation();
newCardValidation.setValidation();