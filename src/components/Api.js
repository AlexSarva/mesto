export default class Api {
    constructor({baseUrl, headers}, {
        profileUpdater,
        newCardRenderer
    }, {
                    avatarSaveRender,
                    profileSaveRender,
                    newCardSaveRender
                }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._profileUpdater = profileUpdater;
        this._newCardRenderer = newCardRenderer;
        this._avatarSaveRender = avatarSaveRender;
        this._profileSaveRender = profileSaveRender;
        this._newCardSaveRender = newCardSaveRender;
    }

    _getInitialProfileInfo() {
        fetch(`${this._baseUrl}/users/me`,
            {headers: this._headers})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(res.status);
            })
            .then((res) => {
                this._myID = res._id;
                this._profileUpdater(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    _checkDeleteCond(item) {
        return item.owner._id !== this._myID;
    }

    _checkMyLike(item) {
        let myLike = false
        item.likes.forEach(user => {
            if (user._id === this._myID) {
                myLike = true
            }
        })
        return myLike
    }

    _checkConditions(item) {
        return {
            deleteCond: this._checkDeleteCond(item),
            likeCond: this._checkMyLike(item)
        }
    }

    _getInitialCards() {
        fetch(`${this._baseUrl}/cards`,
            {headers: this._headers})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(res.status);
            })
            .then((res) => {
                res.reverse().forEach(item => {
                    this._newCardRenderer(item, this._checkConditions(item));
                })
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    patchProfileInfo({name, about}) {
        fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                this._profileUpdater(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                this._profileSaveRender(false);
            })
    }

    addNewCard({name, link}) {
        fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                this._newCardRenderer(res, this._checkConditions(res));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                this._newCardSaveRender(false);
            })
    }

    deleteCard(id) {
        fetch(`${this._baseUrl}/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })
            // TODO удалить или оставить
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    editAvatar({url}) {
        fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url,
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                this._profileUpdater(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                this._avatarSaveRender(false);
            })
    }

    pressLike({likeState, imgID}, {updateLikesCnt}) {
        if (!likeState) {
            fetch(`${this._baseUrl}/cards/${imgID}/likes`,
                {
                    headers: this._headers,
                    method: 'DELETE'
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(res.status);
                })
                .then((res) => {
                    updateLikesCnt(res);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
        } else {
            fetch(`${this._baseUrl}/cards/${imgID}/likes`,
                {
                    headers: this._headers,
                    method: 'PUT'
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }

                    return Promise.reject(res.status);
                })
                .then((res) => {
                    updateLikesCnt(res);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                })
        }
    }

    getBaseContent() {
        this._getInitialProfileInfo();
        this._getInitialCards();
    }
}