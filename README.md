# turtle-handler
library to help handle and controll computerCraft CC:Tweaked turtles. Uses a class to store all active turtles by unique ids and holds all turtles in a class of their own which stores the websocket client connection. The turtle class also has various commands to make controlling the turtles individually from within node.js easier. Not all commands are in the Turtle class however, see [CC:Tweaked Turtle Docs](https://tweaked.cc/module/turtle.html) for a list of all commands for the turtles.

## Websocket configuration
```
const ws = require("ws");
const {Turtle,TurtleStore} = require("turtle-handler");

// create websocket server
const wss = new ws.Server({port:9999});
// create turtleStorage
const turtleArray = new TurtleStore();

wss.on("connection", (ws) => {
    // for each websocket connection create a new turtle and add it to array

    // add websocket client to turtle
    let turtle = new Turtle(ws);
    turtleArray.addTurtle(turtle);

    // turtle added to array and can be commanded with class methods
});
```

## In-game configuration

install json library on turtle
```
$ pastebin get 4nRg9CHU json
```

create startup.lua file on turtle
```
os.loadAPI("json");

local ws,err = http.websocket("WEBSOCKET URL (NGROK)")

if err then
    print(err);
end

if ws then
    while true do
        -- receive message
        local msg = ws.receive();
        print(msg);
        
        -- Receive function and load it to variable
        local obj = json.decode(msg)
        local func = loadstring(obj["func"])

        -- Run function and send values back
        local bool,funcReturn = func()
        funcReturn = json.encode(funcReturn)
        local fullReturn = json.encode(bool,funcReturn)
        ws.send(fullReturn)
    end
end
```

## Turtle Commands
All Commands are asynchronous (does something in game)

### .sendCommand()
send custom command to turtle { print("hello world") } must be prefixed by "return "
```
turtle.sendCommand("return print("hello world)").then(complete => {
    console.log(complete);
}, err => {
    console.error(err);
});
```

### .scanInventory()
scans all 16 slots of a turtles inventory and updates the turtle.inventory object
```
await turtle.scanInventory()
// returns nothing, updates turtle.inventory object
```

### Movement
all movement actions
```
turtle.moveForward().then(complete => {
    console.log(complete)
    // returns {
    //  bool: true, // move complete
    //  obj: null
    //}
}, err => {
    console.error(err);
    // returns {
        bool: false, // unable to move
        obj: STRING // reason why
    }
});

all other movement commands work the same and return the same things
```

### Fuel
.getFuelLevel() and .getFuelLimit()
```
turtle.getFuelLevel().then(level => {
    console.log(level);
    // returns number for fuel level or "unlimited" if turtles do not use fuel when moving is enabled
});
```
.getFuelLimit() operates the same and returns the same thing

### Inspect
.inspect(), .inspectUp(), .inspectDown() all operate and return the same
```
turtle.inspect().then(data => {
    console.log(data)
    // returns {
        bool: true // if there is a block in front of the turtle
        obj: // block data
    }
}, err => {
    // does nothing
});
```

### Inventory

.select(slot) selects a slot in the 16 slot turtle inventory
```
turtle.select(2).then(complete => {
    console.log(complete);
    // returns true if slot was selected
}, err => {
    // does nothing
});
```

.getItemDetail(slot) gets details of item in selected slot (used by scanInventory)
```
turtle.getItemDetail(slot).then(data => {
    console.log(data)
    // returns block data or null if there is no block
}, err => {
    // does nothing
});
```