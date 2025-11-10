// Класс Земля (наследник Клетки)
class SoilCell extends Cell {
    constructor(x, y) {
        super(x, y);
        this.type = 'soil';
        this.plant = null;
    }

    render() {
        super.render();

        if (this.plant) {
            this.plant.renderToCell(this.element);
        }
    }
}