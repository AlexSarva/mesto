export default class UserInfo {
    constructor({profileNameSelector, profileJobSelector, profileImageSelector}) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
        this._profileImage = document.querySelector(profileImageSelector);
    }

    getUserInfo = () => {
        return {name: this._profileName.textContent, job: this._profileJob.textContent}
    }

    setUserInfo({newName, newJob, newImage}) {
        this._profileName.textContent = newName;
        this._profileJob.textContent = newJob;
        this._profileImage.src = newImage;
    }

    GetBaseInfo({url, token}) {
        fetch(url,
            {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(res.status);
        })
        .then((res) => {
            this.setUserInfo({
                newName: res.name,
                newJob: res.about,
                newImage: res.avatar
            });
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
    }


}