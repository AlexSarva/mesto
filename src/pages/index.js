import './index.css'; // добавьте импорт главного файла стилей
import {Card} from "../components/Card.js";
import {
    profilePopupSelector,
    cardPopupSelector,
    attentionPopupSelector,
    avatarPopupSelector,
    profileNameSelector,
    profileJobSelector,
    profileImageSelector,
    cardListSelector,
    imagePopupSelector,
    profileForm,
    profileEditBtn,
    cardForm,
    avatarForm,
    cardAddBtn,
    avatarEditBtn,
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
import PopupWithAttention from "../components/PopupWithAttention.js";


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
            api.addNewCard({
                name: newCardTitle,
                link: newCardSource
            })

        }
    },
    cardPopupSelector);
cardPopup.setEventListeners();

const attentionPopup = new PopupWithAttention({
        formSubmit: (id) => {
            api.deleteCard(id)
            document.getElementById(id).classList.add('fade_type_out');
        }
    },
    attentionPopupSelector);
attentionPopup.setEventListeners();

const avatarPopup = new PopupWithForm({
        formSubmit: ({avatarSource}) => {
            console.log(avatarSource);
            api.editAvatar({
                url: avatarSource
            })
        }
    },
    avatarPopupSelector);
avatarPopup.setEventListeners();

avatarEditBtn.addEventListener('click', () => {
    avatarPopup.open();
    avatarValidation.disableButton();
})


const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// Функция создания карточки
const createCard = (id, name, link, deleteCond, likesCnt) => {
    const newCard = new Card({
            _id: id,
            name: name,
            link: link,
            likesCnt: likesCnt,
            deleteCond: deleteCond,
            handleCardClick: (name, link) => {
                imagePopup.open(name, link);
            },
            handleDelClick: (evt) => {
                attentionPopup.open(evt);
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
    renderer: ({_id, name, link, deleteCond, likes}) => {
        const card = createCard(_id, name, link, deleteCond, likes.length);
        defaultCardList.addItem(card);
    }
}, cardListSelector);

// Валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.setValidation();
const newCardValidation = new FormValidator(validationConfig, cardForm);
newCardValidation.setValidation();
const avatarValidation = new FormValidator(validationConfig, avatarForm);
avatarValidation.setValidation();

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
    newCardInserter: ({_id, name, link, deleteCond, likes}) => {
        const card = createCard(_id, name, link, deleteCond, likes.length);
        defaultCardList.addItem(card);
    }
});
api.getBaseContent();