import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({formSubmit}, popupSelector) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._popupData = this._form.querySelectorAll('.popup__field');
        this._saveBtn = this._popup.querySelector('.popup__save-btn');
        this._submitBtnText = this._saveBtn.textContent;
    }

    _getInputValues = () => {
        this._data = {}
        this._popupData.forEach((element) => {
            this._data[element.name] = element.value;
        })
        return this._data
    }

    setInputValues(data) {
        this._popupData.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._saveBtn.textContent = 'Сохранение...';
            this._formSubmit(this._getInputValues())
                .then(() => this.close())
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
                .finally(() => {
                    this._saveBtn.textContent = this._submitBtnText;
                })
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}