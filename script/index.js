const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__occupation'); // Работа в профиле


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

// Создаем новый элемент-карточку
const createNewElement = (name, link) => {
    const newElement = cardTemplate.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__title').textContent = name;
    const img = newElement.querySelector('.element__image');
    img.src = link;
    img.alt = name;
    newElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('element__like')) {
            const like = evt.target;
            like.classList.toggle('element__like_active');
        } else if (evt.target.classList.contains('element__delete')) {
            const mainElement = evt.target.parentElement;
            fadeRemoveElement(mainElement);
        }
    })
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
    const inputName = profilePopup.querySelector('#profileName');
    const inputJob = profilePopup.querySelector('#profileJob');
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(profilePopup);
})

// Кнопка редактирования профиля
const profileEditBtn = document.querySelector('#profileEditBtn');

// Редактирование профиля
profileEditBtn.addEventListener('click', () => {

    const inputName = profilePopup.querySelector('#profileName');
    inputName.value = profileName.textContent;
    const inputJob = profilePopup.querySelector('#profileJob');
    inputJob.value = profileJob.textContent;

    const closeBtn = profilePopup.querySelector('#profileFormCloseBtn');
    closeBtn.addEventListener('click', () => {
        closePopup(profilePopup);
    })

    openPopup(profilePopup);
})


// для Добавления Карточек
cardPopup.addEventListener('submit', (evt) => {
    const inputTitle = cardPopup.querySelector('#newCardTitle');
    const inputSource = cardPopup.querySelector('#newCardSource');
    evt.preventDefault();
    renderCard(inputTitle.value, inputSource.value);
    closePopup(cardPopup);
})

// Добавление новой карточки
const cardAddBtn = document.querySelector('#cardAddBtn');
cardAddBtn.addEventListener('click', () => {
    const inputTitle = cardPopup.querySelector('#newCardTitle');
    const inputSource = cardPopup.querySelector('#newCardSource');
    inputTitle.value = '';
    inputSource.value = '';
    const newCardCloseBtn = cardPopup.querySelector('#newCardCloseBtn');
    newCardCloseBtn.addEventListener('click', () => {
        closePopup(cardPopup);
    })

    openPopup(cardPopup);
})

// Картинка

cardList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__image')) {
        const curImage = imagePopup.querySelector('.popup__image');
        curImage.src = evt.target.src;
        curImage.alt = evt.target.alt;

        const curText = imagePopup.querySelector('.popup__text');
        const element = evt.target.closest('.element');
        curText.textContent = element.querySelector('.element__title').textContent;

        const imageCloseBtn = imagePopup.querySelector('#imageCloseBtn');
        imageCloseBtn.addEventListener('click', () => {
            closePopup(imagePopup);
        })

        openPopup(imagePopup);
    }
})

