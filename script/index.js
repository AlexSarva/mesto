const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const inputName = profilePopup.querySelector('#profile-name');
const inputJob = profilePopup.querySelector('#profile-job');

const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__occupation'); // Работа в профиле

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}


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

const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.elements');


// Плавное удаление карточки из списка
document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
        e.target.remove();
    }
});

// Удаление карточки из DOM
function fadeRemoveElement(popupObject) {
    popupObject.classList.add('fade_type_out');
}

// Нажатие лайка
const pressLike = (elem) => {
    elem.classList.toggle('element__like_active');
}

// Удаление карточки
const deleteCard = (evt) => {
    const mainElement = evt.target.parentElement;
    fadeRemoveElement(mainElement);
}

// Открытие картинки
const curImage = imagePopup.querySelector('.popup__image');
const curText = imagePopup.querySelector('.popup__text');
const openImage = (evt) => {
    curImage.src = evt.target.src;
    curImage.alt = evt.target.alt;
    const element = evt.target.closest('.element');
    curText.textContent = element.querySelector('.element__title').textContent;
    openPopup(imagePopup);
}

// Кнопка закрытия попапа с картинкой
const imageCloseBtn = imagePopup.querySelector('#imageCloseBtn');
imageCloseBtn.addEventListener('click', () => {
    closePopup(imagePopup);
})

// Создаем новый элемент-карточку
const createNewElement = (name, link) => {
    const newElement = cardTemplate.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__title').textContent = name;
    const img = newElement.querySelector('.element__image');
    img.src = link;
    img.alt = name;
    const like = newElement.querySelector('.element__like');
    like.addEventListener('click', () => pressLike(like));
    const elementDeleteBtn = newElement.querySelector('.element__delete');
    elementDeleteBtn.addEventListener('click', (evt) => deleteCard(evt));
    const image = newElement.querySelector('.element__image');
    image.addEventListener('click', (evt) => openImage(evt));
    return newElement;
};

// Функция создания и добавления карточки
renderCard = (title, link) => {
    const newCard = createNewElement(title, link);
    cardList.prepend(newCard);
}

// Создаем начальные карточки и добавляем в DOM
initialCards.forEach(({name, link}) => {
    renderCard(name, link);
});

// Сохранение профиля
profilePopup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(profilePopup);
})

// Кнопка редактирования профиля
const profileEditBtn = document.querySelector('#profileEditBtn');
profileEditBtn.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(profilePopup);
    enableValidation();
})

// Кнопка закрытия попапа редактирования профиля
const profilePopupCloseBtn = profilePopup.querySelector('#profileFormCloseBtn');
profilePopupCloseBtn.addEventListener('click', () => {
    closePopup(profilePopup);
})

// для Добавления Карточек
const inputTitle = cardPopup.querySelector('#newCardTitle');
const inputSource = cardPopup.querySelector('#newCardSource');
cardPopup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(inputTitle.value, inputSource.value);
    cardPopup.querySelector('.popup__form').reset();
    closePopup(cardPopup);
})

// Кнопка закрытия попапа добавления новой карточки
const newCardCloseBtn = cardPopup.querySelector('#newCardCloseBtn');
newCardCloseBtn.addEventListener('click', () => {
    closePopup(cardPopup);
})

// Добавление новой карточки
const cardAddBtn = document.querySelector('#cardAddBtn');
cardAddBtn.addEventListener('click', () => {
    openPopup(cardPopup);
    enableValidation();
})