const qs = (selector) => document.querySelector(selector);

const formElement = qs('.popup'); // форма

const nameInput = qs('.popup__field_type_name'); // Поле ввода имени
const jobInput = qs('.popup__field_type_job'); // Поле ввода работы


const editBtn = qs('.profile__edit-btn'); // Кнопка редактирования профиля
const closeBtn = qs('.popup__close-btn'); // Кнопка закрытия попапа

const profileName = qs('.profile__name'); // Имя в профиле
const profileJob = qs('.profile__occupation'); // Работа в профиле


// Открытие закрытие попапа редактирование профиля
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

// Карточки по умолчанию.
const initialCards = [
    {
        name: 'Карачаевск',
        link: 'images/element-karachaevsk.jpg'
    },
    {
        name: 'Эльбрус',
        link: 'images/element-elbrus.jpg'
    },
    {
        name: 'Домбай',
        link: 'images/element-dombai.jpg'
    },
    {
        name: 'Алтай',
        link: 'images/element-altai.jpg'
    },
    {
        name: 'Карелия',
        link: 'images/element-kareliya.jpg'
    },
    {
        name: 'Владивосток',
        link: 'images/element-vladivostok.jpg'
    }
];

const elementTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

const createNewElement = (name, link) => {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__title').textContent = name;
    const img = newElement.querySelector('.element__image');
    img.src = link;
    img.alt = name;
    elements.append(newElement);
    console.log(newElement);
};

initialCards.forEach(({name, link}) => {
    createNewElement(name, link);
});


// Лайки
elements.addEventListener('click', (evt) => {
   if (evt.target.classList.contains('element__like')) {
       const like = evt.target;
       like.classList.toggle('element__like_active');
       console.log(like);
   }
})




