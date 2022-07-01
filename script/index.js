import {Card, initialCards} from "./Card.js";
import {FormValidator, validationConfig} from "./FormValidator.js";

const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_new-card');
const inputName = profilePopup.querySelector('#profile-name');
const inputJob = profilePopup.querySelector('#profile-job');
const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__occupation'); // Работа в профиле
const cardList = document.querySelector('.elements');
const profileForm = profilePopup.querySelector('.popup__form');
const profileEditBtn = document.querySelector('#profileEditBtn');
const profilePopupCloseBtn = profilePopup.querySelector('#profileFormCloseBtn');
const inputTitle = cardPopup.querySelector('#newCardTitle');
const inputSource = cardPopup.querySelector('#newCardSource');
const cardForm = cardPopup.querySelector('.popup__form');
const newCardCloseBtn = cardPopup.querySelector('#newCardCloseBtn');
const cardAddBtn = document.querySelector('#cardAddBtn');
const popupList = Array.from(document.querySelectorAll('.popup'));

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

export const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}


// Плавное удаление карточки из списка
document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
        e.target.remove();
    }
});

// Функция создания и добавления карточки
const renderCard = (name, link) => {
    const newCard = new Card(name, link, '#card');
    const cardElement = newCard.generateCard();
    cardList.prepend(cardElement);
}

// Создаем начальные карточки и добавляем в DOM
initialCards.forEach(({name, link}) => {
    renderCard(name, link);
});

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
    openPopup(profilePopup);
    // чтобы кнопка сохранить была активна
    // toggleButtonState(validationConfig, [inputName, inputJob],
    //     profilePopup.querySelector('.popup__save-btn'));

})

// Кнопка закрытия попапа редактирования профиля
profilePopupCloseBtn.addEventListener('click', () => {
    closePopup(profilePopup);
})

// для Добавления Карточек
cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(inputTitle.value, inputSource.value);
    cardForm.reset();
    const saveBtn = cardPopup.querySelector('.popup__save-btn');
    saveBtn.setAttribute('disabled', true);
    saveBtn.classList.add('popup__save-btn_inactive');
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

// Валидация форм
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__field-set'));
    fieldsetList.forEach((fieldSet) => {
        const newValidate = new FormValidator(validationConfig, fieldSet);
        newValidate.setValidation();
    });
});