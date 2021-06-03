/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BasicHarvester');
 * mod.thing == 'a thing'; // true
 */
 
cf = require("CommonFunctions")
const targetRoom = "W33S51"
const homeRoom = "W32S51"

var RemoteMaintainer = {
 
    run: function(creep) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && creep.memory.mining){
            creep.say("Full")
            creep.memory.mining = false
            
        }
        if (creep.store[RESOURCE_ENERGY] == 0 && !creep.memory.mining){
            
            creep.memory.mining = true
            
            creep.say("Empty, FT")
        }
        
        
        //console.log(creep.room.name)
        if(creep.memory.mining && creep.room.name == targetRoom) {
            
            var targets = creep.room.find(FIND_SOURCES);
            
            //console.log(creep.memory.miningTarget instanceof RoomPosition)
            if(creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
	    else if(creep.memory.mining && creep.room.name != targetRoom) {
            var exitdir = creep.room.findExitTo(targetRoom);
            var exit = creep.pos.findClosestByRange(exitdir);
            creep.moveTo(exit)

        
        }
        else if (!creep.memory.mining && creep.room.name == homeRoom){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else if (!creep.memory.mining && creep.room.name != homeRoom){
            var exitdir = creep.room.findExitTo(homeRoom);
            var exit = creep.pos.findClosestByRange(exitdir);
            creep.moveTo(exit)
        }
        
    }

}

module.exports = RemoteMaintainer;