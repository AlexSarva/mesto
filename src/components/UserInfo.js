export default class UserInfo {
    constructor({profileNameSelector, profileJobSelector, profileImageSelector}) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileJob = document.querySelector(profileJobSelector);
        this._profileImage = document.querySelector(profileImageSelector);
    }

    getUserInfo = () => {
        return {name: this._profileName.textContent, about: this._profileJob.textContent}
    }

    setUserInfo({name, about, avatar, _id}) {
        this._profileName.textContent = name;
        this._profileJob.textContent = about;
        this._profileImage.style.backgroundImage = `url('${avatar}')`;
    }

}