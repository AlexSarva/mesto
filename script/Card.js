import {openPopup, closePopup} from "./index.js";

const imagePopup = document.querySelector('.popup_type_image');
const curImage = imagePopup.querySelector('.popup__image');
const curText = imagePopup.querySelector('.popup__text');
const imageCloseBtn = imagePopup.querySelector('#imageCloseBtn');

// Кнопка закрытия попапа с картинкой
imageCloseBtn.addEventListener('click', () => {
    closePopup(imagePopup);
})

export const initialCards = [
    {
        name: 'Карачаевск',
        link: 'images/element-karachaevsk.jpg'
    },
    {
        name: 'Эльбрус',
        link: 'images/element-elbrus.jpg'
    },
    {
        name: 'Домбай',
        link: 'images/element-dombai.jpg'
    },
    {
        name: 'Алтай',
        link: 'images/element-altai.jpg'
    },
    {
        name: 'Карелия',
        link: 'images/element-kareliya.jpg'
    },
    {
        name: 'Владивосток',
        link: 'images/element-vladivostok.jpg'
    }
];

export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate = () => {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _pressLike = (elem) => {
        elem.classList.toggle('element__like_active');
    }

    _fadeRemoveElement = (popupObject) => {
        popupObject.classList.add('fade_type_out');
    }

    _deleteCard = (evt) => {
        const mainElement = evt.target.closest('.element');
        this._fadeRemoveElement(mainElement);
    }

    _openImage = () => {
        curImage.src = this._link;
        curImage.alt = this._name;
        curText.textContent = this._name;
        openPopup(imagePopup);
    }

    generateCard() {
        this._card = this._getTemplate();
        this._card.querySelector('.element__title').textContent = this._name;
        this._img = this._card.querySelector('.element__image');
        this._img.src = this._link;
        this._img.alt = this._name;
        this._like = this._card.querySelector('.element__like');
        this._like.addEventListener('click', () => this._pressLike(this._like))
        this._elementDeleteBtn = this._card.querySelector('.element__delete');

        // Удаление карточки из DOM
        this._elementDeleteBtn.addEventListener('click', (evt) => this._deleteCard(evt));

        this._img.addEventListener('click', () => this._openImage());

        return this._card
    }
}