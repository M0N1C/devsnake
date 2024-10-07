class Fruit {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/fruit.png');
    }

    applyTo(snake) {
        snake.vitamine += 20; // Aumenta la vitamina
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Agua {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/water.png');
    }

    applyTo(snake) {
        snake.hydration += 20; // Aumenta la hidratación
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Sol {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/sun.png');
    }

    applyTo(snake) {
        snake.sun += 20; // Aumenta el sol
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Cafe {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/coffee.png');
    }

    applyTo(snake) {
        snake.hasCoffeePower = true; // Activa poder de café
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Chocolatina {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/chocolate.png');
    }

    applyTo(snake) {
        snake.focus += 20; // Aumenta el enfoque
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Stackoverflow {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/stackoverflow.png');
    }

    applyTo(snake) {
        snake.stackoverflowTokens++; // Aumenta los tokens
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Stackoverflow2 {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/stackoverflow2.png');
    }

    applyTo(snake) {
        snake.stackoverflowTokens += 2; // Aumenta más tokens
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Bomb {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/bomb.png');
    }

    applyTo(snake) {
        // No hace nada porque el efecto de la bomba se maneja en el juego principal
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

class Explosion {
    constructor(position) {
        this.position = position;
        this.image = this.loadImage('images/explosion.png');
    }

    loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }
}

export { Fruit, Agua, Sol, Cafe, Chocolatina, Stackoverflow, Stackoverflow2, Bomb, Explosion };
