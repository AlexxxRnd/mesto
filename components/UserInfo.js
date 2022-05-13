export default class UserInfo {
    constructor({ username, job }) {
        this._username = document.querySelector(username);
        this._job = document.querySelector(job);
    }

    getUserInfo() {
        const userInfo = {
            name: this._username.textContent,
            job: this._job.textContent,
        }
        return userInfo;
    }

    setUserInfo(name, job) {
        this._username.textContent = name;
        this._job.textContent = job;
    }
}