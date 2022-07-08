import {Card} from "./Card.js";
import {initialCards} from "./cardsInfo.js";
import {FormValidator} from "./FormValidator.js";
import Section from "../conponents/Section.js";
import PopupWithImage from "../conponents/PopupWithImage.js";
import PopupWithForm from "../conponents/PopupWithForm.js";
import UserInfo from "../conponents/UserInfo.js";

const profilePopupElement = document.querySelector('.popup_type_profile');
const profilePopupSelector = '.popup_type_profile';
const cardPopupElement = document.querySelector('.popup_type_new-card');
const cardPopupSelector = '.popup_type_new-card';
const profileNameSelector = '.profile__name'; // Имя в профиле
const profileJobSelector = '.profile__occupation'; // Работа в профиле
const cardListSelector = '.elements';
const profileForm = profilePopupElement.querySelector('.popup__form');
const profileEditBtn = document.querySelector('#profileEditBtn');
const cardForm = cardPopupElement.querySelector('.popup__form');
const cardAddBtn = document.querySelector('#cardAddBtn');
const imagePopupSelector = '.popup_type_image';
const inputName = document.querySelector('#profileInputName');
const inputJob = document.querySelector('#profileInputJob');


const validationConfig = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

const profile = new UserInfo({
    profileNameSelector: profileNameSelector,
    profileJobSelector: profileJobSelector,
})

const profilePopup = new PopupWithForm({
        formSubmit: ({profileInputName, profileInputJob}) => {
            profile.setUserInfo({
                newName: profileInputName,
                newJob: profileInputJob,
            })
        }
    },
    profilePopupSelector);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({
        formSubmit: ({newCardTitle, newCardSource}) => {
            const newCard = createCard(newCardTitle, newCardSource);
            defaultCardList.addItem(newCard);
            newCardValidation.disableButton();
        }
    },
    cardPopupSelector);
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// Функция создания карточки
const createCard = (name, link) => {
    const newCard = new Card({
            name: name,
            link: link,
            handleCardClick: (name, link) => {
                imagePopup.open(name, link);
            }
        },
        '#card'
    );
    return newCard.generateCard();
}

// Кнопка редактирования профиля
profileEditBtn.addEventListener('click', () => {
    const curProfileInfo = profile.getUserInfo();
    inputName.value = curProfileInfo.name;
    inputJob.value = curProfileInfo.job;
    profileValidation.enableButton();
    profilePopup.open();
})

// Добавление новой карточки
cardAddBtn.addEventListener('click', () => {
    cardPopup.open();
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