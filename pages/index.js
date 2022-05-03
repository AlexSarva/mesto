const qs = (selector) => document.querySelector(selector);

const formElement = qs('.popup'); // форма

const nameInput = qs('.popup__item_type_name'); // Поле ввода имени
const jobInput = qs('.popup__item_type_job'); // Поле ввода работы


const editBtn = qs('.profile__edit-btn'); // Кнопка редактирования профиля
const closeBtn = qs('.popup__close-btn'); // Кнопка закрытия попапа
const saveBtn = qs('.popup__save-btn'); // Кнопка сохранения попапа

const existName = qs('.profile__name'); // Имя в профиле
const existJob = qs('.profile__occupation'); // Работа в профиле


function togglePopup(popupObject) {
    popupObject.classList.toggle('popup_opened');
}

function editProfile (evt) {
    console.log('editBtn');
    evt.preventDefault();
    togglePopup(formElement);
    nameInput.value = existName.textContent;
    jobInput.value = existJob.textContent;
}

function saveProfile (evt) {
    console.log('saveBtn');
    evt.preventDefault();
    console.log(nameInput.value, jobInput.value);
    existName.textContent = nameInput.value;
    existJob.textContent = jobInput.value;
    togglePopup(formElement);
}

function closePopup (evt) {
    console.log('closeBtn');
    console.log(evt);
    togglePopup(formElement);
}

editBtn.addEventListener('click', editProfile);
formElement.addEventListener('submit', saveProfile);
closeBtn.addEventListener('click', closePopup);
