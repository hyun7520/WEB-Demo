class animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating`;
    }
}

class Cat extends animal {
    constructor(name, age, livesLeft = 9) {
        // this.name = name;
        // this.age = age;
        super(name, age);
        this.livesLeft = livesLeft;
    }
    meow() {
        return `moew`;
    }
}

class Dog extends animal {
    bark() {
        return `woof`;
    }
    eat() {
        return `${this.name} eats food`;
    }
    // if child has function named same as parent's 
    // child's function has high proirity
}

const monty = new Cat('monty', 9);
const david = new Dog('david', 12);

monty.eat();
