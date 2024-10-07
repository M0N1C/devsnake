class Snake {
    constructor() {
        this.hydration = 100;
        this.focus = 100;
        this.vitamine = 100;
        this.sun = 100;
        this.position = [{ x: 5, y: 5 }]; // Comienza en una posición
        this.length = 1;
        this.direction = { x: 0, y: 0 };
        this.hasCoffeePower = false;
        this.stackoverflowTokens = 0;
        this.isDead = false; // Inicialmente la serpiente no está muerta

        this.updateAttributesDisplay();
        this.startDecreasingAttributes(); // Iniciar el decremento de los atributos
    }

    updateAttributesDisplay() {
        document.getElementById('hydration').textContent = this.hydration;
        document.getElementById('focus').textContent = this.focus;
        document.getElementById('vitamine').textContent = this.vitamine;
        document.getElementById('sun').textContent = this.sun;
    }

    move(boardWidth, boardHeight) {
        // Si no hay dirección definida, la serpiente no debe moverse
        if (this.direction.x === 0 && this.direction.y === 0) {
            return;
        }
    
        // Calcular la nueva posición de la cabeza
        let head = {
            x: this.position[0].x + this.direction.x,
            y: this.position[0].y + this.direction.y
        };
    
        // Teletransportar la serpiente si cruza los límites del tablero
        if (head.x >= boardWidth) {
            head.x = 0; // Si cruza el límite derecho, aparece en el izquierdo
        } else if (head.x < 0) {
            head.x = boardWidth - 1; // Si cruza el límite izquierdo, aparece en el derecho
        }
        if (head.y >= boardHeight) {
            head.y = 0; // Si cruza el límite inferior, aparece en el superior
        } else if (head.y < 0) {
            head.y = boardHeight - 1; // Si cruza el límite superior, aparece en el inferior
        }
    
        // Añadir la nueva posición de la cabeza al inicio
        this.position.unshift(head);
    
        // Verificar si la cabeza colisiona con cualquier parte del cuerpo (excluyendo la cabeza misma)
        for (let i = 1; i < this.position.length; i++) {
            if (this.position[i].x === head.x && this.position[i].y === head.y) {
                this.isDead = true; // Marcar la serpiente como muerta
                return;
            }
        }
    
        // Mantener la longitud de la serpiente
        if (this.position.length > this.length) {
            this.position.pop(); // Elimina la cola si la longitud excede
        }
    
        this.updateAttributesDisplay();
    }
    
    grow() {
        this.length++;
    }

    changeDirection(newDirection) {
        // Cambia la dirección de la serpiente solo si es diferente de la opuesta
        if (newDirection.x !== -this.direction.x || newDirection.y !== -this.direction.y) {
            this.direction = newDirection; 
        }
    }

    applyItemEffects(item) {
        item.applyTo(this); // Aplica el efecto del objeto
        this.updateAttributesDisplay(); // Actualiza la interfaz después de aplicar el efecto
    }

    startDecreasingAttributes() {
        // Llama a decreaseAttributes cada 10 segundos
        this.decreaseInterval = setInterval(() => {
            this.decreaseAttributes();
        }, 10000);
    }

    decreaseAttributes() {
        this.hydration = Math.max(0, this.hydration - 10);
        this.focus = Math.max(0, this.focus - 10);
        this.vitamine = Math.max(0, this.vitamine - 10);
        this.sun = Math.max(0, this.sun - 10);
        this.updateAttributesDisplay(); // Actualiza la interfaz después de decrecer
    }

    isAlive() {
        return (
            this.hydration > 0 &&
            this.focus > 0 &&
            this.vitamine > 0 &&
            this.sun > 0 &&
            !this.isDead
        );
    }
}

export default Snake; // Asegúrate de exportar la clase
