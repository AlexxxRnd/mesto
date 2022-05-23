export default class Api {
    constructor(data) {
        this._url = data.url;
        this._header = data.header;
    }

    _getResponse(res) {
        if (res.ok) {
            //return console.log(res.json());
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._header
        })
            .then(res => this._getResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          headers: this._header
        })
          .then(res => this._getResponse(res));
      }

      
}