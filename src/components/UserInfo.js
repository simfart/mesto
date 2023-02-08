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

    setUserInfo(name, description, avatar) {
        this._name.textContent = name
        this._description.textContent = description
        this._avatar.src = avatar
}

// setUserInfo(name, description, avatar) {
//     this._name.textContent = name
//     this._description.textContent = description
//     this._avatar.src = avatar
// }
}