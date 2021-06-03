/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BasicHarvester');
 * mod.thing == 'a thing'; // true
 */
cf = require("CommonFunctions")
 
var buildingsToFill = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER]
var lesserBTF = [STRUCTURE_CONTAINER]
var roleHarvester = {
 
    run: function(creep) {
        
        
        
        
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && creep.memory.mining){
            creep.say("Full")
            creep.memory.mining = false
            creep.memory.miningTarget = false;
        }
         if (creep.store[RESOURCE_ENERGY] == 0 && !creep.memory.miningTarget){
            
            creep.memory.mining = true
            for (var sourcePos in Memory.sources){
                
                if (cf.findGoingTo(Memory.sources[sourcePos][0]) < Memory.sources[sourcePos][1]){
                    creep.memory.miningTarget = Memory.sources[sourcePos][0]
                }
            }
            creep.say("Empty, FT")
        }
        
        if (creep.memory.mining && !creep.memory.miningTarget){
            creep.memory.miningTarget = Memory.sources[cf.defaultSource][0]
        }
        
        if(creep.memory.mining) {
            
            const sources = new RoomPosition(creep.memory.miningTarget.x, creep.memory.miningTarget.y, creep.memory.miningTarget.roomName).lookFor(LOOK_SOURCES);
            
            //console.log(creep.memory.miningTarget instanceof RoomPosition)
            const tryy = creep.harvest(sources[0])
            //console.log(tryy)
            if(tryy == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        //else if (creep.memory.mining && creep.room.roomName != creep.memory.miningTarget.roomName){
        //    var exitdir = creep.room.findExitTo(creep.memory.miningTarget.roomName);
        //    var exit = creep.pos.findClosestByRange(exitdir);
        //    creep.moveTo(exit)
        //
        //}


        else if (!creep.memory.mining){
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (buildingsToFill.includes(structure.structureType)) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if (targets.length == 0){
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (lesserBTF.includes(structure.structureType)) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            }
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        //else if(!creep.memory.mining && creep.room.roomName != cf.homeBase){
        //    var exitdir = creep.room.findExitTo(cf.homeBase);
        //    var exit = creep.pos.findClosestByRange(exitdir);
        //    creep.moveTo(exit)
        //}
    }

}

module.exports = roleHarvester;
