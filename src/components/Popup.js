export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _closeByEsc = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._closeBtn = this._popup.querySelector('.popup__close-btn');
        this._closeBtn.addEventListener('click', () => {
            this.close()
        });
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })

    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEsc);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeByEsc);
    }
}