export default class Section {
    constructor({ items, renderer }, container) {
        this._data = items;
        this._renderer = renderer;
        this._container = container;
    }

    renderAll = () => {
        this._data.forEach(item => {
            this._renderer(item);
        });
    }

    addItem = (item) => {
        this._container.prepend(item);
    }
}