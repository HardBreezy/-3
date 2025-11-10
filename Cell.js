// Базовый класс Клетка
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'empty';
        this.element = null;
        this.moisture = 0;
    }

    // Создание DOM-элемента для клетки
    createElement() {
        const cell = document.createElement('div');
        cell.className = `cell ${this.type}`;
        cell.dataset.x = this.x;
        cell.dataset.y = this.y;
        this.element = cell;
        this.render();
        return cell;
    }

    // Отрисовка клетки
    render() {
        if (!this.element) return;

        this.element.innerHTML = '';
        this.element.className = `cell ${this.type}`;

        // Устанавливаем цвет почвы в зависимости от влажности
        if (this.type === 'soil') {
            const dryColor = [242, 214, 116];
            const wetColor = [101, 67, 33];

            const r = Math.round(dryColor[0] * (1 - this.moisture) + wetColor[0] * this.moisture);
            const g = Math.round(dryColor[1] * (1 - this.moisture) + wetColor[1] * this.moisture);
            const b = Math.round(dryColor[2] * (1 - this.moisture) + wetColor[2] * this.moisture);

            this.element.style.background = `rgb(${r}, ${g}, ${b})`;

        } else if (this.type === 'water') {
            this.element.textContent = '💧';
        } else {
            this.element.textContent = '';
        }
    }

    // Вычисление влажности на основе близости к воде
    calculateMoisture(grid, maxDistance = 3) {
        if (this.type !== 'soil') return;

        let totalMoisture = 0;

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                const cell = grid[y][x];
                if (cell.type === 'water') {
                    const distance = Math.sqrt(
                        Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)
                    );

                    if (distance <= maxDistance) {
                        const moistureFromThisWater = 1 / (1 + distance * distance);
                        totalMoisture += moistureFromThisWater;
                    }
                }
            }
        }

        this.moisture = Math.min(1, totalMoisture);
        this.render();
    }
}