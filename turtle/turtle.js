const {generateUniqueId} = require("../utils/generateId");

class Turtle {
    constructor(wsClient) {
        this.id = generateUniqueId();
        this.label = null;
        this.inventory = null;

        if (!wsClient) {
            console.error("Websocket client not provided");
        } else {
            this.webSocketClient = wsClient;
        }

        return this.id;
    }

    async sendCommand(cmd) {
        return new Promise((resolve, reject) => {
            this.webSocketClient.send(JSON.stringify({func:cmd.toString()}));

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    // methods
    async scanInventory() {
        let inventory = {};
        for (let i=1; i<=16;i++) {
            let item = await this.getItemDetail(i);
            inventory[i] = item;
        }
        this.inventory = inventory;
    }

    // actions
    async moveForward() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.forward()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async moveBack() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.back()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async moveUp() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.up()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async moveDown() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.down()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async turnLeft() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.turnLeft()");
            
            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async turnRight() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.turnRight()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async getFuelLevel() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.getFuelLevel()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let level = parsed[0];

                resolve(level);
            });
        });
    }

    async getFuelLimit() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.getFuelLimit()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let limit = parsed[0];

                resolve(limit);
            });
        });
    }

    async inspect() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.inspect()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async inspectUp() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.inspectUp()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async inspectDown() {
        return new Promise((resolve, reject) => {
            this.sendCommand("return turtle.inspectDown()");

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let obj = parsed[1];

                if (bool) {
                    resolve({bool,obj});
                } else {
                    reject({bool,obj});
                }
            });
        });
    }

    async select(slot) {
        return new Promise((resolve, reject) => {
            this.sendCommand(`return turtle.select(${slot})`);

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];

                if (bool) {
                    resolve(bool);
                } else {
                    reject(bool);
                }
            });
        });
    }

    async place(text) {
        return new Promise((resolve, reject) => {
            if (!text) {
                this.sendCommand(`return turtle.place()`);
            } else {
                this.sendCommand(`return turtle.place(${text})`);
            }

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let string = parsed[1];

                if (bool) {
                    resolve({placed:bool,reason:null});
                } else {
                    reject({placed:bool,reason:string});
                }
            });
        });
    }

    async placeUp(text) {
        return new Promise((resovle, reject) => {
            if (!text) {
                this.sendCommand(`return turtle.placeUp()`);
            } else {
                this.sendCommand(`return turtle.placeUp(${text})`);
            }

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let string = parsed[1];

                if (bool) {
                    resovle({placed:bool,reason:null});
                } else {
                    reject({placed:bool,reason:string});
                }
            });
        });
    }

    async placeDown(text) {
        return new Promise((resolve, reject) => {
            if (!text) {
                this.sendCommand(`return turtle.placeDown()`);
            } else {
                this.sendCommand(`return turtle.placeDown(${text})`);
            }

            this.webSocketClient.once("message", (msg) => {
                let parsed = JSON.parse(msg.toString());
                let bool = parsed[0];
                let string = parsed[1];

                if (bool) {
                    resolve({placed:bool,reason:null});
                } else {
                    reject({placed:bool,reason:string});
                }
            });
        });
    }

    async getItemDetail(slot) {
        return new Promise((resolve, reject) => {
            this.sendCommand(`return turtle.getItemDetail(${slot})`);
            this.webSocketClient.once("message", (msg) => {
                let table = JSON.parse(msg)[0];
                
                if (table) {
                    resolve(table);
                } else {
                    reject(null);
                }
            });
        });
    }
}

module.exports = {Turtle};