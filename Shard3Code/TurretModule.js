/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('TurretModule');
 * mod.thing == 'a thing'; // true
 */
cf = require("CommonFunctions")

module.exports = {
    run: function (turret) {
        //console.log(turret)
        const targets = turret.room.find(FIND_HOSTILE_CREEPS)
        if ( targets.length > 0){
            turret.attack(targets[0])
        }
        if (targets.length > 4){
            turret.room.controller.activateSafeMode()
        }
    }
};