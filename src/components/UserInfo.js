export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo = () => {
        const userInfo = {
            fullname: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar.src
        };
        return userInfo;
    }

    setUserInfo = (data) => {
        if (data.fullname) {
            this._name.textContent = data.fullname;
        };
        if (data.job) {
            this._job.textContent = data.job;
        }
    }
}