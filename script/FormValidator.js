export class FormValidator {
    constructor(cfg, formElement) {
        this._inputSelector = cfg.inputSelector;
        this._submitButtonSelector = cfg.submitButtonSelector;
        this._inactiveButtonClass = cfg.inactiveButtonClass;
        this._inputErrorClass = cfg.inputErrorClass;
        this._errorClass = cfg.errorClass;
        this._formElement = formElement;
    }


    _showInputError = (inputElement, errorMessage) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    }

    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState = () => {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput()) {
            // сделай кнопку неактивной
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    setValidation = () => {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._formElement, inputElement);
                this._toggleButtonState(this._inputList, this._buttonElement);
            });
        });
        this._saveBtn = this._formElement.querySelector('.popup__save-btn');
        this._formElement.addEventListener('submit', () => {
            this._saveBtn.setAttribute('disabled', true);
            this._saveBtn.classList.add('popup__save-btn_inactive');
        });
    };
}