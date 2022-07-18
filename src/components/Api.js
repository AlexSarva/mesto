export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialProfileInfo({updater}) {
        fetch(`${this._baseUrl}/users/me`,
            {headers: this._headers})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(res.status);
            })
            .then((res) => {
                updater(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    getInitialCards({updater}) {
        fetch(`${this._baseUrl}/cards`,
            {headers: this._headers})
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(res.status);
            })
            .then((res) => {
                updater(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }
}