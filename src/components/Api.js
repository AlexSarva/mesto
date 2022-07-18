export default class Api {
    constructor({baseUrl, headers}, {profileUpdater,
        cardsRenderer}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._profileUpdater = profileUpdater;
        this._cardsRenderer = cardsRenderer;
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
                this._profileUpdater(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
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
                this._profileUpdater(res)
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