export default class UserInfo {
    constructor({ nameSelector, aboutSelectors, avatar }) {
        this._name = document.querySelector(nameSelector)
        this._description = document.querySelector(aboutSelectors)
        this._avatar = document.querySelector(avatar)
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name
        this._description.textContent = data.about
        this._avatar.src = data.avatar
    }
}