const qs = (selector) => document.querySelector(selector);

const formElement = qs('.popup'); // форма

const nameInput = qs('.popup__field_type_name'); // Поле ввода имени
const jobInput = qs('.popup__field_type_job'); // Поле ввода работы


const editBtn = qs('.profile__edit-btn'); // Кнопка редактирования профиля
const closeBtn = qs('.popup__close-btn'); // Кнопка закрытия попапа
const saveBtn = qs('.popup__save-btn'); // Кнопка сохранения попапа

const profileName = qs('.profile__name'); // Имя в профиле
const profileJob = qs('.profile__occupation'); // Работа в профиле


function togglePopup(popupObject) {
    popupObject.classList.toggle('popup_opened');
}

function editProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    togglePopup(formElement);
}

function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup(formElement);
}

function closePopup() {
    togglePopup(formElement);
}

editBtn.addEventListener('click', editProfile);
formElement.addEventListener('submit', saveProfile);
closeBtn.addEventListener('click', closePopup);
