const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const inputName = profilePopup.querySelector('#profile-name');
const inputJob = profilePopup.querySelector('#profile-job');
const profileName = document.querySelector('.profile__name'); // Имя в профиле
const profileJob = document.querySelector('.profile__occupation'); // Работа в профиле
const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.elements');
const curImage = imagePopup.querySelector('.popup__image');
const curText = imagePopup.querySelector('.popup__text');
const imageCloseBtn = imagePopup.querySelector('#imageCloseBtn');
const profileForm = profilePopup.querySelector('.popup__form');
const profileEditBtn = document.querySelector('#profileEditBtn');
const profilePopupCloseBtn = profilePopup.querySelector('#profileFormCloseBtn');
const inputTitle = cardPopup.querySelector('#newCardTitle');
const inputSource = cardPopup.querySelector('#newCardSource');
const cardForm = cardPopup.querySelector('.popup__form');
const newCardCloseBtn = cardPopup.querySelector('#newCardCloseBtn');
const cardAddBtn = document.querySelector('#cardAddBtn');
const popupList = Array.from(document.querySelectorAll('.popup'));

// Закрытие popup через Esc
const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}


// Плавное удаление карточки из списка
document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
        e.target.remove();
    }
});

// Удаление карточки из DOM
const fadeRemoveElement = (popupObject) => {
    popupObject.classList.add('fade_type_out');
}

// Нажатие лайка
const pressLike = (elem) => {
    elem.classList.toggle('element__like_active');
}

// Удаление карточки
const deleteCard = (evt) => {
    const mainElement = evt.target.closest('.element');
    fadeRemoveElement(mainElement);
}

// Открытие картинки
const openImage = (imageSource, imageName) => {
    curImage.src = imageSource;
    curImage.alt = imageName;
    curText.textContent = imageName;
    openPopup(imagePopup);
}

// Кнопка закрытия попапа с картинкой
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
    image.addEventListener('click', () => openImage(link, name));
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
profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(profilePopup);
})

// Кнопка редактирования профиля
profileEditBtn.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(profilePopup);
    // чтобы кнопка сохранить была активна
    toggleButtonState(validationConfig, [inputName, inputJob],
        profilePopup.querySelector('.popup__save-btn'));

})

// Кнопка закрытия попапа редактирования профиля
profilePopupCloseBtn.addEventListener('click', () => {
    closePopup(profilePopup);
})

// для Добавления Карточек
cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderCard(inputTitle.value, inputSource.value);
    cardForm.reset();
    const saveBtn = cardPopup.querySelector('.popup__save-btn');
    saveBtn.setAttribute('disabled', true);
    saveBtn.classList.add('popup__save-btn_inactive');
    closePopup(cardPopup);
})

// Кнопка закрытия попапа добавления новой карточки
newCardCloseBtn.addEventListener('click', () => {
    closePopup(cardPopup);
})

// Добавление новой карточки
cardAddBtn.addEventListener('click', () => {
    openPopup(cardPopup);
})

// Закрытие popup нажатием на overlay
const overlayClosePopup = (popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
}

popupList.forEach((curPopup) => {
    overlayClosePopup(curPopup);
})