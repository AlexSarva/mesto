const showInputError = (validateCfg, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validateCfg.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validateCfg.errorClass);
};

const hideInputError = (validateCfg, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validateCfg.inputErrorClass);
    errorElement.classList.remove(validateCfg.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (validateCfg, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(validateCfg, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validateCfg, formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (validateCfg, inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(validateCfg.inactiveButtonClass);
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(validateCfg.inactiveButtonClass);
    }
};

const setEventListeners = (validateCfg, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validateCfg.inputSelector));
    const buttonElement = formElement.querySelector(validateCfg.submitButtonSelector);
    toggleButtonState(validateCfg, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(validateCfg, formElement, inputElement);
            toggleButtonState(validateCfg, inputList, buttonElement);
        });
    });
};

const enableValidation = (validateCfg) => {
    const formList = Array.from(document.querySelectorAll(validateCfg.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(formElement.querySelectorAll(validateCfg.inputFieldSet));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(validateCfg, fieldSet);
        });
    });
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    inputFieldSet: '.popup__field-set',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field-error_active'
};

enableValidation(validationConfig);