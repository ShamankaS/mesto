export default class Section {
    constructor({ items, renderer }, selector) {
        this._data = items;
        this._renderer = renderer;
        this._selector = document.querySelector(selector);
    }

    renderItem() {
        this._data.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(item) {
        this._selector.prepend(item);
    }
}