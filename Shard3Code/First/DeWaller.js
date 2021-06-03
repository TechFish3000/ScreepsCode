/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BasicHarvester');
 * mod.thing == 'a thing'; // true
 */
 
cf = require("CommonFunctions")
const targetRoom = "W32S50"
const homeRoom = "W32S51"

var DeWaller = {
 
    run: function(creep) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && creep.memory.mining){
            creep.say("Full")
            creep.memory.mining = false
            
        }
        if (creep.store[RESOURCE_ENERGY] == 0 && !creep.memory.mining){
            
            creep.memory.mining = true
            
            creep.say("Empty, FT")
        }
        
        
        console.log(creep.room.name)
        if(creep.memory.mining && creep.room.name == targetRoom) {
            
            var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL)
                    }});
            
            //console.log(creep.memory.miningTarget instanceof RoomPosition)
            if(creep.dismantle(targets[3]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[3]);
            }
        }
	    else if(creep.memory.mining && creep.room.name != targetRoom) {
            var exitdir = creep.room.findExitTo(targetRoom);
            var exit = creep.pos.findClosestByRange(exitdir);
            creep.moveTo(exit)

        
        }
        else if (!creep.memory.mining && creep.room.name == homeRoom){
            if(creep.upgradeController(Game.rooms[homeRoom]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.rooms[homeRoom].controller);
            }
        }
        else if (!creep.memory.mining && creep.room.name != homeRoom){
            var exitdir = creep.room.findExitTo(targetRoom);
            var exit = creep.pos.findClosestByRange(exitdir);
            creep.moveTo(exit)
        }
        
    }

}

module.exports = DeWaller;
