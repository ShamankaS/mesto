export default class Api {
    constructor(data) {
        this._cohortId = data.cohortId;
        this._headers = data.headers;
    };

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    };

    async getUserInfo() {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me}`, {
            headers: this._headers
        });
        return this._handleResponse(res);
    };

    async getInitialCards() {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards}`, {
            headers: this._headers
        });
        return this._handleResponse(res);
    };

    async setUserInfo(userInfo) {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me}`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userInfo.fullname,
                about: userInfo.job
            })
        });
        return this._handleResponse(res);
    };

    async addNewCard(data) {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards}`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        });
        return this._handleResponse(res);
    };

    async deleteCard(id) {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards/${id}}`,  {
            method: 'DELETE',
            headers: this._headers
        });
        return this._handleResponse(res);
    };

    async putLike(id) {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes}`, {
            method: 'PUT',
            headers: this._headers
        });
        return this._handleResponse(res);
    };

    async deleteLike(id) {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards/${id}/likes}`, {
            method: 'DELETE',
            headers: this._headers
        });
        return this._handleResponse(res);
    };

    async changeAvatar(data) {
        const res = await fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me/avatar}`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        return this._handleResponse(res);
    };
}

