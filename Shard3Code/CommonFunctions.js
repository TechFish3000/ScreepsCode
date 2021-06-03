/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CommonFunctions');
 * mod.thing == 'a thing'; // true
 */
 
module.exports.homeBase = "W32S51"
module.exports.defaultSource = 1
module.exports.findGoingTo = findGoingTo


function findGoingTo(sourcePl) {
    //console.log(sourcePl.x)
    var amt = 0
    for (var creep in Game.creeps){
        if (!Game.creeps[creep].memory.miningTarget){
            continue
        }
        if (Game.creeps[creep].memory.miningTarget.x == sourcePl.x && Game.creeps[creep].memory.miningTarget.y == sourcePl.y && Game.creeps[creep].memory.miningTarget.roomName == sourcePl.roomName){
            amt++
        }
    }
    return amt
    
    //return _.filter(Game.creeps, (creep) => creep.memory.miningTarget != false && (creep.memory.miningTarget.x == sourcePl.x && creep.memory.miningTarget.y == sourcePl.y && creep.memory.miningTarget.roomName == sourcePl.roomName)).length;
}