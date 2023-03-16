export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo = () => {
        const userInfo = {
            fullname: this._name.textContent,
            job: this._job.textContent
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