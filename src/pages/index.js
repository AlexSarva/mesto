import './index.css'; // добавьте импорт главного файла стилей
import {Card} from "../components/Card.js";
import {
    profilePopupSelector,
    cardPopupSelector,
    profileNameSelector,
    profileJobSelector,
    profileImageSelector,
    cardListSelector,
    imagePopupSelector,
    profileForm,
    profileEditBtn,
    cardForm,
    cardAddBtn,
    inputName,
    inputJob,
    validationConfig,
    apiConfig
} from "../utils/constants.js";
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";


const profile = new UserInfo({
    profileNameSelector: profileNameSelector,
    profileJobSelector: profileJobSelector,
    profileImageSelector: profileImageSelector
})

const profilePopup = new PopupWithForm({
        formSubmit: ({profileInputName, profileInputJob}) => {
            api.patchProfileInfo({
                name: profileInputName,
                about: profileInputJob
            })
        }
    },
    profilePopupSelector);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm({
        formSubmit: ({newCardTitle, newCardSource}) => {
            const newCard = createCard(newCardTitle, newCardSource);
            defaultCardList.addItem(newCard);
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
    newCardValidation.disableButton();
})

const defaultCardList = new Section({
    renderer: ({name, link}) => {
        const card = createCard(name, link);
        defaultCardList.addItem(card);
    }
}, cardListSelector);

// Валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
const newCardValidation = new FormValidator(validationConfig, cardForm);
profileValidation.setValidation();
newCardValidation.setValidation();

const api = new Api(apiConfig, {
    profileUpdater: ({name, about, avatar}) => {
        profile.setUserInfo({
            newName: name,
            newJob: about,
            newImage: avatar
        })
    },
    cardsRenderer: (items) => {
        defaultCardList.renderItems(items)
    },
});
api.getBaseContent();