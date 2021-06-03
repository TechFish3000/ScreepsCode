/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BasicHarvester');
 * mod.thing == 'a thing'; // true
 */
 
cf = require("CommonFunctions")


var BasicRepairer = {
 
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
        
        if (creep.memory.mining && creep.memory.miningTarget == false){
            creep.memory.miningTarget = Memory.sources[cf.defaultSource][0]
        }
        
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL)
                    }
                });
                
        if (targets.length == 0){
            targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax)
                    }
                });
        }
        
        if(creep.memory.mining) {
            
            var sources = new RoomPosition(creep.memory.miningTarget.x, creep.memory.miningTarget.y, creep.memory.miningTarget.roomName).lookFor(LOOK_SOURCES);
            
            //console.log(creep.memory.miningTarget instanceof RoomPosition)
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        
        
        else if (targets.length > 0){
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
        else{
            creep.moveTo(Game.flags["RepairerRally"])
        }
        
    }

}

module.exports = BasicRepairer;