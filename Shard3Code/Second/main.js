creepProcessor = require("CreepProcessor")




module.exports.loop = function () {
    if (!Memory.initialized){
        Memory.homeRoomName = Game.spawns["Spawn1"].room.name
        Memory.sources = []
        const sources = Game.spawns["Spawn1"].room.find(FIND_SOURCES);

        for (var source in sources){
            var floors = 0
            for(var y = source.pos.y - 1; y < source.pos.y + 1; y++){
                for(var x = source.pos.x - 1; x < source.pos.x + 1; x++){
                    if (Room.Terrain(Memory.homeRoomName).get(x, y) != 1){
                        floors++
                    }
                }
            }
            Memory.sources.push([source.pos.x, source.pos.y, source.pos.roomName, floors])
        }
        console.log("Initialisation complete. World domination beginning.")
        Memory.initialized = true

    }
    creepProcessor.process()
}
