export default class Api {
    constructor({baseUrl, headers}, {profileUpdater,
        cardsRenderer, newCardInserter}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._profileUpdater = profileUpdater;
        this._cardsRenderer = cardsRenderer;
        this._newCardInserter = newCardInserter;
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
                res.forEach(item => {
                    item.deleteCond = this._checkDeleteCond(item)
                })
                return res
            })
            .then((res) => {
                this._cardsRenderer(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    patchProfileInfo({name, about}) {
        fetch(`${this._baseUrl}/users/me`,{
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
                res.deleteCond = this._checkDeleteCond(res)
                this._profileUpdater(res)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    addNewCard({name, link}) {
        fetch(`${this._baseUrl}/cards`,{
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
                this._newCardInserter(res)
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    deleteCard(id) {
        fetch(`${this._baseUrl}/cards/${id}`,{
            headers: this._headers,
            method: 'DELETE',
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.status);
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    getBaseContent() {
        this._getInitialProfileInfo();
        this._getInitialCards();
    }
}