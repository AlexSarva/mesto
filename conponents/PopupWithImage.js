import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        this._curImage = this._popup.querySelector('.popup__image');
        this._curText = this._popup.querySelector('.popup__text');
        this._curImage.src = link;
        this._curImage.alt = name;
        this._curText.textContent = name;
        super.open();
    }

}