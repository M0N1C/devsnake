class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.objects = {};
    }

    placeObject(object) {
        const positionKey = `${object.position.x},${object.position.y}`;
        this.objects[positionKey] = object;
    }

    removeObject(position) {
        const positionKey = `${position.x},${position.y}`;
        delete this.objects[positionKey];
    }

    getObjectAtPosition(position) {
        const positionKey = `${position.x},${position.y}`;
        return this.objects[positionKey];
    }

    getEmptyPositions() {
        const emptyPositions = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const positionKey = `${x},${y}`;
                if (!this.objects[positionKey]) {
                    emptyPositions.push({ x, y });
                }
            }
        }
        return emptyPositions;
    }

    draw(ctx) {
        const cellSize = 20; // Tamaño de cada celda del tablero

        Object.values(this.objects).forEach(object => {
            const size = cellSize * 1.5; // Hacer los objetos un 50% más grandes que la celda
            const offset = (size - cellSize) / 2; // Para centrar los objetos más grandes en la celda

            ctx.drawImage(
                object.image, 
                object.position.x * cellSize - offset, 
                object.position.y * cellSize - offset, 
                size, 
                size
            );
        });
    }
}

export default Board;
