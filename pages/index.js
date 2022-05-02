const qs = (selector) => document.querySelector(selector);

const formElement = qs('.popup'); // форма

const nameInput = qs('.popup__item_type_name'); // Поле ввода имени
const jobInput = qs('.popup__item_type_job'); // Поле ввода работы


const editBtn = qs('.profile__edit-btn'); // Кнопка редактирования профиля
const closeBtn = qs('.popup__close-btn'); // Кнопка закрытия попапа
const saveBtn = qs('.popup__save-btn'); // Кнопка сохранения попапа

const existName = qs('.profile__name'); // Имя в профиле
const existJob = qs('.profile__occupation'); // Работа в профиле


function togglePopup (popupObject) {
    popupObject.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', function (evt) {
    console.log('editBtn');
    evt.preventDefault();
    togglePopup(formElement);
    nameInput.value = existName.textContent;
    jobInput.value = existJob.textContent;
});

formElement.addEventListener('click', (evt) => {
    console.log('closeOverlay');
    console.log(evt);
    if (evt.target === evt.currentTarget) {
        togglePopup(formElement);
    }
});

formElement.addEventListener('submit', (evt) => {
    console.log('saveBtn');
    evt.preventDefault();
    console.log(nameInput.value, jobInput.value);
    existName.textContent = nameInput.value;
    existJob.textContent = jobInput.value;
    togglePopup(formElement);
});

closeBtn.addEventListener('click', function (evt) {
    console.log('closeBtn');
    console.log(evt);
    togglePopup(formElement);
});
