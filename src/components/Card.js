export class Card {
    constructor({name, link, likesCnt, deleteCond, handleCardClick}, cardSelector) {
        this._name = name;
        this._link = link;
        this._likesCnt = likesCnt;
        this._deleteCond = deleteCond;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _pressLike = () => {
        this._like.classList.toggle('element__like_active');
    }

    _fadeRemoveElement = (popupObject) => {
        popupObject.classList.add('fade_type_out');
    }

    _deleteCard = (evt) => {
        const mainElement = evt.target.closest('.element');
        this._fadeRemoveElement(mainElement);
    }

    generateCard() {
        this._card = this._getTemplate();
        this._card.querySelector('.element__title').textContent = this._name;
        this._img = this._card.querySelector('.element__image');
        this._img.src = this._link;
        this._img.alt = this._name;
        this._like = this._card.querySelector('.element__like');
        this._like.addEventListener('click', () => this._pressLike());
        this._likeCnt = this._card.querySelector('.element__like-cnt');
        this._likeCnt.textContent = this._likesCnt;
        this._elementDeleteBtn = this._card.querySelector('.element__delete');

        if (!this._deleteCond) {
            this._elementDeleteBtn.classList.add('element__delete_active');
        }

        // Удаление карточки из DOM
        this._elementDeleteBtn.addEventListener('click', (evt) => this._deleteCard(evt));

        this._img.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        // Плавное удаление карточки из списка
        this._card.addEventListener('animationend', function (e) {
            if (e.animationName === 'fade-out') {
                e.target.remove();
            }
        });

        return this._card
    }
}