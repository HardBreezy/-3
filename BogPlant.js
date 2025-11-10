// Класс Болотник (наследник Растения)
class BogPlant extends Plant {
    constructor(cell) {
        super(cell);
        this.name = 'Болотник';
        this.symbol = '🌿';
        this.preferredMoisture = { min: 0.7, max: 1.0 };
    }

    updateAppearance() {
        this.symbol = '🌿';
    }
}