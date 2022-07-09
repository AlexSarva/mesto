const karachaevskImage = new URL('../images/element-karachaevsk.jpg', import.meta.url);
const elbrusImage = new URL('../images/element-elbrus.jpg', import.meta.url);
const dombaiImage = new URL('../images/element-dombai.jpg', import.meta.url);
const altaiImage = new URL('../images/element-altai.jpg', import.meta.url);
const kareliyaImage = new URL('../images/element-kareliya.jpg', import.meta.url);
const vladivostokImage = new URL('../images/element-vladivostok.jpg', import.meta.url);

export const initialCards = [
    {
        name: 'Карачаевск',
        link: karachaevskImage,
    },
    {
        name: 'Эльбрус',
        link: elbrusImage,
    },
    {
        name: 'Домбай',
        link: dombaiImage,
    },
    {
        name: 'Алтай',
        link: altaiImage,
    },
    {
        name: 'Карелия',
        link: kareliyaImage,
    },
    {
        name: 'Владивосток',
        link: vladivostokImage,
    }
];

export const profilePopupSelector = '.popup_type_profile';
export const cardPopupSelector = '.popup_type_new-card';
export const profileNameSelector = '.profile__name'; // Имя в профиле
export const profileJobSelector = '.profile__occupation'; // Работа в профиле
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