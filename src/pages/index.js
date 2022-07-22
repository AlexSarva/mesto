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
        formSubmit: ({profileInputName, profileInputJob}) => {
            api.patchProfileInfo({
                name: profileInputName,
                about: profileInputJob
            })
        }
    },
    profilePopupSelector);
profilePopup.setEventListeners();

// NewCard Popup
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

// Attention Popup
const attentionPopup = new PopupWithAttention({
        formSubmit: (id) => {
            api.deleteCard(id)
            document.getElementById(id).classList.add('fade_type_out');
        }
    },
    attentionPopupSelector);
attentionPopup.setEventListeners();

// Avatar Popup
const avatarPopup = new PopupWithForm({
        formSubmit: ({avatarSource}) => {
            api.editAvatar({
                url: avatarSource
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
    inputName.value = curProfileInfo.name;
    inputJob.value = curProfileInfo.job;
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
// TODO Нужен ли тут renderer
const defaultCardList = new Section(cardListSelector);

// API
const api = new Api(apiConfig, {
    profileUpdater: ({name, about, avatar}) => {
        profile.setUserInfo({
            newName: name,
            newJob: about,
            newImage: avatar
        })
    },
    newCardRenderer: ({_id, name, link, likes}, {deleteCond, likeCond}) => {
        const card = createCard({
            id: _id,
            name: name,
            link: link,
            likesCnt: likes.length
        }, {
            deleteCond: deleteCond,
            likeCond: likeCond
        });
        defaultCardList.addItem(card);
    }
}, {
    avatarSaveRender: (isLoading) => {
        avatarPopup.renderSaving(isLoading);
    },
    profileSaveRender: (isLoading) => {
        profilePopup.renderSaving(isLoading);
    },
    newCardSaveRender: (isLoading) => {
        cardPopup.renderSaving(isLoading);
    }
});
api.getBaseContent();

// Валидация форм
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.setValidation();
const newCardValidation = new FormValidator(validationConfig, cardForm);
newCardValidation.setValidation();
const avatarValidation = new FormValidator(validationConfig, avatarForm);
avatarValidation.setValidation();

// Функция создания карточки
const createCard = ({id, name, link, likesCnt}, {deleteCond, likeCond}) => {
    const newCard = new Card({
            _id: id,
            name: name,
            link: link,
            likesCnt: likesCnt,
            deleteCond: deleteCond,
            likeCond: likeCond
        }, {
            handleCardClick: (name, link) => {
                imagePopup.open(name, link);
            },
            handleDelClick: (evt) => {
                attentionPopup.open(evt);
            },
            handleLikeClick: (likeState, imgID) => {
                api.pressLike({
                    likeState: likeState,
                    imgID: imgID
                }, {
                    updateLikesCnt: (res) => {
                        newCard.updateLikes({likesCnt: res.likes.length});
                    }
                });


            }
        },
        cardSelector
    );
    return newCard.generateCard();
}