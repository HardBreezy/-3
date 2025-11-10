// Класс Кактус (наследник Растения)
class CactusPlant extends Plant {
    constructor(cell) {
        super(cell);
        this.name = 'Кактус';
        this.symbol = '🌵';
        this.preferredMoisture = { min: 0.0, max: 0.3 };
    }

    updateAppearance() {
        this.symbol = '🌵';
    }
}