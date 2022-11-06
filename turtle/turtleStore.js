class TurtleStore {
    constructor() {
        this.store = {};
    }

    addTurtle(Turtle) {
        this.store[Turtle.id] = Turtle;
    }

    removeTurtle(Turtle) {
        let id = Turtle.id;
        delete this.store[id];
    }

    removeTurtleById(id) {
        delete this.store[id];
    }

    getTurtleById(id) {
        return this.store[id];
    }
}

module.exports = {TurtleStore};