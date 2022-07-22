import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({formSubmit}, popupSelector) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._popupData = this._form.querySelectorAll('.popup__field');
        this._saveBtn = this._popup.querySelector('.popup__save-btn');
    }

    renderSaving(isLoading) {
        if (isLoading) {
            this._saveBtn.value = 'Сохранение...';
            this._saveBtn.textContent = 'Сохранение...';
        } else {
            this._saveBtn.value = 'Сохранить';
            this._saveBtn.textContent = 'Сохранить';
        }
    }

    _getInputValues = () => {
        this._data = {}
        this._popupData.forEach(element => {
            this._data[element.id] = element.value;
        })
        return this._data
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderSaving(true);
            this._formSubmit(this._getInputValues());
            this.close();
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}