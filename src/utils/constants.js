export const profilePopupSelector = '.popup_type_profile';
export const cardPopupSelector = '.popup_type_new-card';
export const profileNameSelector = '.profile__name'; // Имя в профиле
export const profileJobSelector = '.profile__occupation'; // Работа в профиле
export const profileImageSelector = '.profile__avatar'; // Работа в профиле
export const cardListSelector = '.elements';
export const imagePopupSelector = '.popup_type_image';
export const profileForm = document.querySelector('.popup_type_profile').querySelector('.popup__form');
export const profileEditBtn = document.querySelector('#profileEditBtn');
export const cardForm = document.querySelector('.popup_type_new-card').querySelector('.popup__form');
export const cardAddBtn = document.querySelector('#cardAddBtn');
export const inputName = document.querySelector('#profileInputName');
export const inputJob = document.querySelector('#profileInputJob');


export const validationConfig = {
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

export const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        authorization: '521c5c18-4214-46d9-8387-7f33ad54ebee',
        'Content-Type': 'application/json'
    }
}