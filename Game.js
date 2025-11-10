// Игровая логика
class Game {
    constructor() {
        this.grid = [];
        this.rows = 16;
        this.cols = 16;
        this.currentTool = 'shovel';
        this.selectedSeed = 'potato';
        this.init();
    }

    // Инициализация игры
    init() {
        this.createGrid();
        this.setupEventListeners();

        document.querySelector('.seed-btn[data-seed="potato"]').classList.add('active');
    }

    // Создание игровой сетки
    createGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';

        for (let y = 0; y < this.rows; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                const cell = new SoilCell(x, y);
                this.grid[y][x] = cell;
                gridElement.appendChild(cell.createElement());
            }
        }

        this.calculateAllMoisture();
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        const gridElement = document.getElementById('grid');

        gridElement.addEventListener('click', (e) => {
            const cellElement = e.target.closest('.cell');
            if (!cellElement) return;

            const x = parseInt(cellElement.dataset.x);
            const y = parseInt(cellElement.dataset.y);
            this.handleCellClick(x, y);
        });

        document.getElementById('tool-shovel').addEventListener('click', () => {
            this.setTool('shovel');
        });

        document.getElementById('tool-bucket').addEventListener('click', () => {
            this.setTool('bucket');
        });

        document.querySelectorAll('.seed-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectedSeed = btn.dataset.seed;
                this.setTool('seed');

                document.querySelectorAll('.seed-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
            });
        });

        document.getElementById('tool-shovel').classList.add('active');
    }

    // Обработка клика по клетке
    handleCellClick(x, y) {
        const cell = this.grid[y][x];

        switch (this.currentTool) {
            case 'shovel':
                this.useShovel(cell);
                break;
            case 'bucket':
                this.useBucket(cell);
                break;
            case 'seed':
                this.plantSeed(cell);
                break;
        }

        this.calculateAllMoisture();
    }

    // Использование лопаты
    useShovel(cell) {
        if (cell.type === 'soil' && cell.plant) {
            cell.plant = null;
            cell.render();
        }
    }

    // Использование ведра
    useBucket(cell) {
        if (cell.type === 'soil') {
            const newCell = new WaterCell(cell.x, cell.y);
            newCell.element = cell.element;
            this.grid[cell.y][cell.x] = newCell;
            newCell.render();

            // Пересчитываем влажность после добавления воды
            this.calculateAllMoisture();
        }
    }

    // Посадка семян
    plantSeed(cell) {
        if (cell.type !== 'soil' || !this.selectedSeed) {
            return;
        }

        let plant;
        switch (this.selectedSeed) {
            case 'bog':
                plant = new BogPlant(cell);
                break;
            case 'potato':
                plant = new PotatoPlant(cell);
                break;
            case 'cactus':
                plant = new CactusPlant(cell);
                break;
        }

        if (plant) {
            if (cell.plant) {
                cell.plant = null;
            }
            cell.plant = plant;

            cell.render();
        }
    }

    // Установка текущего инструмента
    setTool(tool) {
        this.currentTool = tool;

        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (tool === 'shovel') {
            document.getElementById('tool-shovel').classList.add('active');
        } else if (tool === 'bucket') {
            document.getElementById('tool-bucket').classList.add('active');
        }
    }

    // Вычисление влажности для всех клеток
    calculateAllMoisture() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.grid[y][x].calculateMoisture(this.grid, 3);
            }
        }

        // После пересчета влажности проверяем состояние всех растений
        this.checkAllPlants();
    }

    // Проверка состояния всех растений
    checkAllPlants() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = this.grid[y][x];
                if (cell.type === 'soil' && cell.plant) {
                    const beforeAlive = cell.plant.alive;
                    const beforeSymbol = cell.plant.symbol;
                    cell.plant.checkState();

                    // Если состояние изменилось, перерисовываем
                    if (beforeAlive !== cell.plant.alive || beforeSymbol !== cell.plant.symbol) {
                        cell.render();
                    }
                }
            }
        }
    }

}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Game();

});
