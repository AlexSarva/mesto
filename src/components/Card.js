export class Card {
    constructor({_id, name, link, likesCnt, deleteCond, likeCond}, {
        handleCardClick,
        handleDelClick,
        handleLikeClick
    }, cardSelector) {
        this._id = _id;
        this._name = name;
        this._link = link;
        this._likesCnt = likesCnt;
        this._deleteCond = deleteCond;
        this._likeCond = likeCond;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDelClick = handleDelClick;
        this._handleLikeClick = handleLikeClick;
        // Card.all.push(this);
    }

    // static all = [];


    // destroy() {
    //     let i = Card.all.indexOf(this);
    //     Card.all.splice(i, 1);
    // }

    updateLikes({likesCnt}) {
        this._likeCnt.textContent = likesCnt;
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

    _checkLike() {
        return this._like.classList.contains('element__like_active');
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
        this._card.id = this._id;
        this._title = this._card.querySelector('.element__title')
        this._title.textContent = this._name;
        this._img = this._card.querySelector('.element__image');
        this._img.src = this._link;
        this._img.alt = this._name;
        this._like = this._card.querySelector('.element__like');
        this._like.addEventListener('click', () => {
            this._pressLike();
            this._handleLikeClick(this._checkLike(), this._id);
        });
        this._likeCnt = this._card.querySelector('.element__like-cnt');
        this._likeCnt.textContent = this._likesCnt;
        this._elementDeleteBtn = this._card.querySelector('.element__delete');

        if (!this._deleteCond) {
            this._elementDeleteBtn.classList.add('element__delete_active');
        }

        if (this._likeCond) {
            this._pressLike();
        }

        // Удаление карточки из DOM
        this._elementDeleteBtn.addEventListener('click', () => {
            this._handleDelClick(this._id);
        });

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