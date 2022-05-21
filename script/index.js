const qs = (selector) => document.querySelector(selector);

const body = qs('body');

const addBtn = qs('.profile__add-btn'); // Кнопка добавление карточки
const editBtn = qs('.profile__edit-btn'); // Кнопка редактирования профиля
const closeBtn = qs('.popup__close-btn'); // Кнопка закрытия попапа

const profileName = qs('.profile__name'); // Имя в профиле
const profileJob = qs('.profile__occupation'); // Работа в профиле


// Открытие закрытие попапа
function addPopup(popupObject) {
    popupObject.classList.add('popup_opened');
}

function removePopup(popupObject) {
    popupObject.classList.remove('popup_opened');
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

const createNewElement = (name, link) => {
    const newElement = elementTemplate.querySelector('.element').cloneNode(true);
    newElement.querySelector('.element__title').textContent = name;
    const img = newElement.querySelector('.element__image');
    img.src = link;
    img.alt = name;
    elements.prepend(newElement);
};

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
       mainElement.remove();
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
        curPopup.remove();
    })

    curPopup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        createNewElement(inputName.value, inputSource.value);
        curPopup.remove();
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
        curPopup.remove();
    })

    curPopup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        profileName.textContent = inputName.value;
        profileJob.textContent = inputSource.value;
        curPopup.remove();
    })

    body.append(curPopup);
})



