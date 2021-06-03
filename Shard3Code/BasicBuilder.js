/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BasicHarvester');
 * mod.thing == 'a thing'; // true
 */
cf = require("CommonFunctions")
 
var BasicBuilder = {
 
    run: function(creep) {
        
        
        
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && creep.memory.mining){
            creep.say("Full")
            creep.memory.mining = false
            creep.memory.miningTarget = false;
        }
         if (creep.store[RESOURCE_ENERGY] == 0 && !creep.memory.miningTarget){
            
            creep.memory.mining = true
            for (var sourcePos in Memory.sources){
                //console.log(cf.findGoingTo(Memory.sources[sourcePos][0]) < Memory.sources[sourcePos][1])
                if (cf.findGoingTo(Memory.sources[sourcePos][0]) < Memory.sources[sourcePos][1]){
                    creep.memory.miningTarget = Memory.sources[sourcePos][0]
                }
            }
            creep.say("Empty, FT")
        }
        if (creep.memory.mining && !creep.memory.miningTarget){
            creep.memory.miningTarget = Memory.sources[cf.defaultSource][0]
        }
        
        var sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES).length
        
        if(creep.memory.mining) {
            
            var sources = new RoomPosition(creep.memory.miningTarget.x, creep.memory.miningTarget.y, creep.memory.miningTarget.roomName).lookFor(LOOK_SOURCES);
            
            //console.log(creep.memory.miningTarget instanceof RoomPosition)
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        
        
        
        else if (sites > 0) {
            if(creep.build(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES));
            }
        }
        else{
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller)
            }
        }
        
    }

}

module.exports = BasicBuilder;