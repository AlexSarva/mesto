import Popup from "./Popup.js";

export default class PopupWithAttention extends Popup {
    constructor({formSubmit}, popupSelector) {
        super(popupSelector);
        this._formSubmit = formSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._cardID);
            this.close();
        })
    }

    open(id) {
        this._cardID = id;
        super.open();
    }
}