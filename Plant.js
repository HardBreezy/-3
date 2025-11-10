// Базовый класс Растение
class Plant {
    constructor(cell) {
        this.cell = cell;
        this.alive = true;
        this.symbol = '';
        this.name = 'Растение';
        this.preferredMoisture = { min: 0, max: 1 };

        this.checkState();
    }

    // Проверка состояния растения (живое/мертвое)
    checkState() {
        const moisture = this.cell.moisture;

        // Проверяем, подходит ли влажность
        if (moisture < this.preferredMoisture.min || moisture > this.preferredMoisture.max) {
            this.alive = false;
            this.symbol = '💀';
        } else {
            this.alive = true;
            this.updateAppearance();
        }
    }

    // Обновление внешнего вида, базовый метод, переопределяется в наследниках
    updateAppearance() {

    }

    // Отрисовка растения в клетке
    renderToCell(cellElement) {
        const plantSymbol = document.createElement('div');
        plantSymbol.textContent = this.symbol;
        plantSymbol.style.fontSize = '18px';
        plantSymbol.style.position = 'absolute';
        plantSymbol.style.top = '50%';
        plantSymbol.style.left = '50%';
        plantSymbol.style.transform = 'translate(-50%, -50%)';
        cellElement.appendChild(plantSymbol);

        // Если растение мертво, добавляем соответствующий класс
        if (!this.alive) {
            cellElement.style.filter = 'grayscale(1)';
            cellElement.style.opacity = '0.7';
        } else {
            cellElement.style.filter = 'none';
            cellElement.style.opacity = '1';
        }
    }

}
