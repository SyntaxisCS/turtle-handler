os.loadAPI("json")

local ws,err = http.websocket("WEBSOCKET URL (NGROK)")

if err then
    print(err)
end

if ws then
    while true do
        -- receive message
        local msg = ws.receive()
        print(msg)

        -- receive function and load it to variable
        local obj = json.decode(msg)
        local func = loadstring(obj["func"])

        -- run function and send values back
        local bool,other = func()
        local fullReturn = json.encode({bool,other})
        ws.send(fullReturn)
    end
end