import { Fruit, Agua, Sol, Cafe, Chocolatina, Stackoverflow, Stackoverflow2, Bomb } from './object.js';
import Board from './board.js';
import Snake from './snake.js';

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error(`No se encontró el canvas con el ID "${canvasId}"`);
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.board = new Board(20, 20); // Crear un tablero de 20x20
        this.snake = new Snake(); // Asegúrate de que se cree correctamente
        this.items = [];
        this.score = 0;
        this.coffeeSpeed = 100; // Velocidad normal del juego
        this.normalSpeed = 100;
        this.explosionSound = new Audio('sounds/bumm.mp3'); // Cargar el sonido de explosión
        this.isGameOver = false; // Estado del juego

        this.loadImages(); // Cargar imágenes antes de iniciar el juego

        // Agregar manejo de teclado para cambiar dirección
        document.addEventListener('keydown', (event) => {
            if (!this.isGameOver) { // Solo permitir cambios de dirección si el juego no ha terminado
                switch (event.key) {
                    case 'ArrowUp':
                        this.snake.changeDirection({ x: 0, y: -1 });
                        break;
                    case 'ArrowDown':
                        this.snake.changeDirection({ x: 0, y: 1 });
                        break;
                    case 'ArrowLeft':
                        this.snake.changeDirection({ x: -1, y: 0 });
                        break;
                    case 'ArrowRight':
                        this.snake.changeDirection({ x: 1, y: 0 });
                        break;
                }
            }
        });
    }

    loadImages() {
        const images = [
            'images/fruit.png',
            'images/water.png',
            'images/sun.png',
            'images/coffee.png',
            'images/chocolate.png',
            'images/stackoverflow.png',
            'images/stackoverflow2.png',
            'images/check.png',
            'images/bomb.png',
            'images/explosion.png'
        ];
        let loadedImages = 0;

        images.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    this.spawnItems(5); // Generar 5 objetos al inicio
                }
            };
        });
    }

    startGame() {
        if (this.snake.isAlive() && !this.isGameOver) { // Comprobar si el juego no ha terminado
            this.snake.move(this.board.width, this.board.height); // Pasar el ancho y la altura
            this.checkCollisions();
            this.draw();
            setTimeout(() => this.startGame(), this.snake.hasCoffeePower ? this.coffeeSpeed / 2 : this.normalSpeed); // Velocidad ajustada para el café
        }
    }

    spawnItems(count = 1) {
        const itemClasses = [Fruit, Agua, Sol, Cafe, Chocolatina, Stackoverflow, Stackoverflow2, Bomb];
        let itemsToSpawn = count;

        const spawnItemInterval = setInterval(() => {
            if (itemsToSpawn <= 0) {
                clearInterval(spawnItemInterval); // Detener el intervalo cuando se hayan generado todos los objetos
                return;
            }

            const emptyPositions = this.board.getEmptyPositions();

            // Filtrar posiciones que ya están ocupadas por la serpiente
            const validPositions = emptyPositions.filter(pos =>
                !this.snake.position.some(segment => segment.x === pos.x && segment.y === pos.y)
            );

            if (validPositions.length === 0) {
                clearInterval(spawnItemInterval);
                return; // No hay posiciones disponibles
            }

            // Generar un objeto al azar
            const ItemClass = itemClasses[Math.floor(Math.random() * itemClasses.length)];
            const position = validPositions[Math.floor(Math.random() * validPositions.length)];
            const item = new ItemClass(position);
            this.board.placeObject(item);
            this.items.push(item);

            itemsToSpawn--; // Decrementar el número de objetos restantes
        }, 2000); // Genera un nuevo objeto cada 2 segundos (2000 ms)
    }

    triggerExplosionEffect() {
        // Limpiar el canvas y detener el dibujo del juego
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Cargar la imagen de la explosión
        const explosionImg = new Image();
        explosionImg.src = 'images/explosion.png';

        // Reproducir el sonido de explosión
        this.explosionSound.play();

        // Dibujar la explosión ocupando todo el canvas
        let scale = 1;
        let expanding = true;

        // Detener cualquier otro intervalo que se esté ejecutando (si hay)
        clearTimeout(this.gameInterval); // Asegúrate de que this.gameInterval sea la variable que controla el juego

        const explosionInterval = setInterval(() => {
            // Limpiar el canvas antes de cada dibujado
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Aumentar y disminuir el tamaño de la explosión para hacer el efecto
            if (expanding) {
                scale += 0.1;
                if (scale >= 3) {
                    expanding = false;
                }
            } else {
                scale -= 0.1;
                if (scale <= 1) {
                    expanding = true;
                }
            }

            // Dibujar la imagen de la explosión
            const x = (this.canvas.width - explosionImg.width * scale) / 2;
            const y = (this.canvas.height - explosionImg.height * scale) / 2;
            this.ctx.drawImage(explosionImg, x, y, explosionImg.width * scale, explosionImg.height * scale);
        }, 100); // Actualizar cada 100 ms para la animación

        // Detener el efecto de explosión después de unos segundos y mostrar el botón de reinicio
        setTimeout(() => {
            clearInterval(explosionInterval);
            this.isGameOver = true; // Marcar el juego como terminado
            this.showRestartButton(); // Mostrar el botón de reinicio
        }, 3000); // Duración de la animación: 3 segundos
    }

    showRestartButton() {
        // Crear un botón de reinicio
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Jugar de nuevo';
        restartButton.style.position = 'absolute';
        restartButton.style.top = '50%';
        restartButton.style.left = '50%';
        restartButton.style.transform = 'translate(-50%, -50%)';
        restartButton.style.fontSize = '24px';
        restartButton.style.padding = '10px 20px';
        restartButton.style.cursor = 'pointer';

        // Añadir un evento al botón para reiniciar el juego
        restartButton.addEventListener('click', () => {
            document.location.reload(); // Reiniciar el juego
        });

        // Añadir el botón al cuerpo del documento
        document.body.appendChild(restartButton);
    }

    checkCollisions() {
        const head = this.snake.position[0];
        const objectAtHead = this.board.getObjectAtPosition(head);

        // Verificar si la serpiente choca consigo misma
        for (let i = 1; i < this.snake.position.length; i++) {
            if (this.snake.position[i].x === head.x && this.snake.position[i].y === head.y) {
                this.triggerExplosionEffect(); // Si la serpiente choca consigo misma, activar el efecto de explosión
                return;
            }
        }

        if (objectAtHead) {
            if (objectAtHead instanceof Bomb && !this.snake.hasCoffeePower) {
                this.triggerExplosionEffect(); // Activar el efecto de explosión si colisiona con una bomba
                return; // Detener el resto de la lógica, ya que el juego termina
            }

            // Si el objeto no es una bomba, aplicar sus efectos
            this.snake.applyItemEffects(objectAtHead);

            // Mostrar el efecto visual de recoger el objeto (mostrar "check")
            const checkImg = new Image();
            checkImg.src = 'images/check.png';
            this.ctx.drawImage(checkImg, head.x * 20, head.y * 20, 20, 20);

            // Crecer la serpiente tras recoger un objeto
            this.snake.grow();

            // Eliminar el objeto del tablero
            this.board.removeObject(head);

            // Generar un nuevo objeto tras recoger uno
            this.spawnItems(1);

            // Incrementar la puntuación
            this.score++;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Limpiar el canvas
        this.board.draw(this.ctx); // Dibuja el tablero
        this.snake.position.forEach(segment => {
            this.ctx.fillStyle = this.snake.hasCoffeePower ? 'rgba(0, 255, 0, 0.5)' : 'lime'; // Cambiar a color transparente si tiene café
            this.ctx.fillRect(segment.x * 20, segment.y * 20, 18, 18); // Dibuja la serpiente
            this.ctx.strokeStyle = 'darkgreen'; // Bordes para la serpiente
            this.ctx.strokeRect(segment.x * 20, segment.y * 20, 18, 18); // Añadir borde a la serpiente
        });
    }

    handleCoffeePower() {
        // Función para manejar el efecto del café
        this.snake.hasCoffeePower = true; // Activar el poder del café
        this.normalSpeed /= 2; // Aumentar la velocidad
        setTimeout(() => {
            this.snake.hasCoffeePower = false; // Desactivar el poder del café
            this.normalSpeed *= 2; // Restablecer la velocidad
            this.snake.changeDirection({ x: -this.snake.direction.x, y: -this.snake.direction.y }); // Cambio de dirección inesperado
        }, 5000); // Durar 5 segundos el efecto
    }
}

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    const canvasId = 'gameCanvas';
    const game = new Game(canvasId); // Crear instancia del Game

    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        game.startGame(); // Iniciar el juego al hacer clic
    });
});
