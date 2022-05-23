const qs = (selector) => document.querySelector(selector);

const body = qs('body');

const addBtn = qs('.profile__add-btn'); // Кнопка добавление карточки
const editBtn = qs('.profile__edit-btn'); // Кнопка редактирования профиля
const closeBtn = qs('.popup__close-btn'); // Кнопка закрытия попапа

const profileName = qs('.profile__name'); // Имя в профиле
const profileJob = qs('.profile__occupation'); // Работа в профиле

// Удаление после анимации исчезновения Popup
document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
        e.target.remove();
    }
});

// Удаление Popup из DOM
function fadeRemoveElement(popupObject) {
    popupObject.classList.add('fade_type_out');
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

const elementTemplate = qs('#card').content;
const elements = qs('.elements');

// Создаем новый элемент-карточку
const createNewElement = (name, link) => {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__title').textContent = name;
    const img = newElement.querySelector('.element__image');
    img.src = link;
    img.alt = name;
    elements.prepend(newElement);
};

// Создаем начальные карточки и добавляем в DOM
initialCards.forEach(({name, link}) => {
    createNewElement(name, link);
});

// Лайки и удаление
elements.addEventListener('click', (evt) => {
   if (evt.target.classList.contains('element__like')) {
       const like = evt.target;
       like.classList.toggle('element__like_active');
   }
   else if (evt.target.classList.contains('element__delete')) {
       const mainElement = evt.target.parentElement;
       fadeRemoveElement(mainElement);
   }
})

// Popup
const popup = qs('#popup').content;

// для Добавления Карточек
addBtn.addEventListener('click', () => {
    const curPopup = popup.querySelector('.popup').cloneNode(true);
    const title = curPopup.querySelector('.popup__title');
    title.textContent = 'Новое место'
    
    const inputName = curPopup.querySelector('#name');
    inputName.placeholder = 'Название';
    const inputSource= curPopup.querySelector('#source');
    inputSource.placeholder = 'Ссылка на картинку';

    const closeBtn = curPopup.querySelector('#closeBtn');
    closeBtn.addEventListener('click', () => {
        fadeRemoveElement(curPopup);
    })

    curPopup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        createNewElement(inputName.value, inputSource.value);
        fadeRemoveElement(curPopup);
    })

    body.append(curPopup);
    
})

// Для редактирования профиля
editBtn.addEventListener('click', () => {
    const curPopup = popup.querySelector('.popup').cloneNode(true);
    const title = curPopup.querySelector('.popup__title');
    title.textContent = 'Редактировать профиль'

    const inputName = curPopup.querySelector('#name');
    inputName.placeholder = 'Имя';
    inputName.value = profileName.textContent;
    const inputSource= curPopup.querySelector('#source');
    inputSource.placeholder = 'О себе';
    inputSource.value = profileJob.textContent;

    const closeBtn = curPopup.querySelector('#closeBtn');
    closeBtn.addEventListener('click', () => {
        fadeRemoveElement(curPopup);
    })

    curPopup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        profileName.textContent = inputName.value;
        profileJob.textContent = inputSource.value;
        fadeRemoveElement(curPopup);
    })

    body.append(curPopup);
})

// Картинка
const imagePopup = qs('#image-popup').content;

elements.addEventListener('click', (evt) => {
    
    const curPopup = imagePopup.querySelector('.image-popup').cloneNode(true);

    const closeBtn = curPopup.querySelector('#imageCloseBtn');
    closeBtn.addEventListener('click',() => {
        fadeRemoveElement(curPopup);
    })

    if (evt.target.classList.contains('element__image')) {
        const curImage = curPopup.querySelector('.image-popup__image');
        curImage.src = evt.target.src;
        curImage.alt = evt.target.alt;

        const curText = curPopup.querySelector('.image-popup__text');
        const element = evt.target.closest('.element');
        curText.textContent = element.querySelector('.element__title').textContent;

        body.append(curPopup);
    }
})

