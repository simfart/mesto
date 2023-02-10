export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialUserCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  // .then(res => this._parseResponse(res));

  createNewCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.cardName,
        link: data.cardLink,
      }),
    }).then(res => this._getResponseData(res));
  }

  setLikes(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes/`, {
      method: "PUT",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  deleteLikes(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes/`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  deleteCards(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  getInitialUserInfo() {
    return fetch(`${this._baseUrl}/users/me/`, {
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  editlUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.avatarName,
        about: data.avatarDescription
      })
    }).then(res => this._getResponseData(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink
      })
    }).then(res => this._getResponseData(res));
  }
}