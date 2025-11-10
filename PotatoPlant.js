// Класс Картошка (наследник Растения)
class PotatoPlant extends Plant {
    constructor(cell) {
        super(cell);
        this.name = 'Картошка';
        this.symbol = '🥔';
        this.preferredMoisture = { min: 0.3, max: 0.7 };
    }

    updateAppearance() {
        this.symbol = '🥔';
    }
}