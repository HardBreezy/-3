// Класс Вода (наследник Клетки)
class WaterCell extends Cell {
    constructor(x, y) {
        super(x, y);
        this.type = 'water';
    }
}