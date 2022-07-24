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
    cardSelector,
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

// Profile class
const profile = new UserInfo({
    profileNameSelector: profileNameSelector,
    profileJobSelector: profileJobSelector,
    profileImageSelector: profileImageSelector
})

// Profile Popup
const profilePopup = new PopupWithForm({
        formSubmit: (profileInfo) => {
            return api.patchProfileInfo(profileInfo)
                .then((res) => {
                    profile.setUserInfo(res);
                })
        }
    },
    profilePopupSelector);
profilePopup.setEventListeners();

// NewCard Popup
const cardPopup = new PopupWithForm({
        formSubmit: (cardInfo) => {
            return api.addNewCard(cardInfo)
                .then((card) => {
                    defaultCardList.addItem({
                        card: card,
                        conditions: {
                            deleteCond: false,
                            likeCond: false
                        }
                    })
                })
        }
    },
    cardPopupSelector);
cardPopup.setEventListeners();

// Attention Popup
const attentionPopup = new PopupWithAttention({
        formSubmit: (id) => {
            api.deleteCard(id)
                .then(() => {
                    attentionPopup.close();
                    document.getElementById(id).classList.add('fade_type_out');
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
            //
        }
    },
    attentionPopupSelector);
attentionPopup.setEventListeners();

// Avatar Popup
const avatarPopup = new PopupWithForm({
        formSubmit: (avatar) => {
            return api.editAvatar(avatar)
                .then((res) => {
                    profile.setUserInfo(res);
                })
        }
    },
    avatarPopupSelector);
avatarPopup.setEventListeners();

// Image Popup
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// Profile edit btn
profileEditBtn.addEventListener('click', () => {
    const curProfileInfo = profile.getUserInfo();
    profilePopup.setInputValues(curProfileInfo);
    profileValidation.enableButton();
    profilePopup.open();
})

// Avatar edit btn
avatarEditBtn.addEventListener('click', () => {
    avatarPopup.open();
    avatarValidation.disableButton();
})

// New card btn
cardAddBtn.addEventListener('click', () => {
    cardPopup.open();
    newCardValidation.disableButton();
})

// Cards section
const defaultCardList = new Section({
    renderer: ({card, conditions}) => {
        return createCard(card, conditions);
    }
}, cardListSelector);

// API
const api = new Api(apiConfig);
Promise.all([api.getInitialProfileInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        profile.setUserInfo(userData);
        const newCards = [];
        cards.forEach((card) => {
            const conditions = checkCardConditions(card, userData._id)
            newCards.push({card, conditions});
        })
        defaultCardList.renderItems(newCards)
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    })


// Валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();
const newCardValidation = new FormValidator(validationConfig, cardForm);
newCardValidation.enableValidation();
const avatarValidation = new FormValidator(validationConfig, avatarForm);
avatarValidation.enableValidation();

// Функция создания карточки

const checkCardConditions = (card, myID) => {
    let myLike = false
    card.likes.forEach(user => {
        if (user._id === myID) {
            myLike = true
        }
    })
    return {
        deleteCond: myID !== card.owner._id,
        likeCond: myLike
    }
}

const createCard = (card, conditions) => {

    const newCard = new Card(card, conditions, {
            handleCardClick: (name, link) => {
                imagePopup.open(name, link);
            },
            handleDelClick: (evt) => {
                attentionPopup.open(evt);
            },
            handleLikeClick: (likeState, imgID) => {
                console.log(likeState, imgID);
                return api.pressLike({
                    likeState: likeState,
                    imgID: imgID
                })
                    .then((res) => {
                        newCard.updateLikes({likesCnt: res.likes.length})
                        newCard.pressLike();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    })

            }
        },
        cardSelector
    );
    return newCard.generateCard();
}