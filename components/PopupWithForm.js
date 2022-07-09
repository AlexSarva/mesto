import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({formSubmit}, popupSelector) {
        super(popupSelector);
        this._formSubmit = formSubmit;
    }

    _getInputValues = () => {
        this._popupData = this._popup.querySelectorAll('.popup__field');
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
            this._formSubmit(this._getInputValues());
            this.close();
        })
    }

    close() {
        this._popup.querySelector('.popup__form').reset();
        super.close();
    }
}