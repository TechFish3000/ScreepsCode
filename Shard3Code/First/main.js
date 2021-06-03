var roleHarvester = require('BasicHarvester');
var basicMaintainer = require("BasicMaintainer");
var basicBuilder = require("BasicBuilder");
var basicRepairer = require("BasicRepairer")
var remoteMaintainer = require("RemoteMaintainer")
var turretModule = require("TurretModule")


var cf = require("CommonFunctions")

const workerParts = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]

const neededHarvesters = 3
const harvesterParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]

const neededMaintainers = 3
const maintainerParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]

const neededBuilders = 3
const BuilderParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]

const neededRepairers = 2
const repairerParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]

const neededRemoteMaintainers = 1


const loggingEnabled = false;



module.exports.loop = function () {
    //Memory.sources = [[new RoomPosition(35, 46, "W32S51"), 2], [new RoomPosition(13, 28, "W32S51"), 4]]
    //for (var i in Game.creeps) {Game.creeps[i].memory.miningTarget = Memory.sources[1][0]}
    if (loggingEnabled){
        console.log("---")
        console.log(Game.rooms["W32S51"].controller.progressTotal - Game.rooms["W32S51"].controller.progress)
    }
    // if (Game.rooms["W32S51"].find(FIND_HOSTILE_CREEPS).length > 0){
    //     Game.rooms["W32S51"].controller.activateSafeMode()
    // }


    if (Game.cpu.bucket == 10000){
        Game.cpu.generatePixel()
    }

    var buildingQueued = false;
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
           
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if (harvesters.length == 0){
        var newName = "EmergencyHarvester" + Game.time;
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: "harvester"}})
        buildingQueued = true
    }

    if (harvesters.length < neededHarvesters && !buildingQueued){
        var newName = 'Harvester' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(workerParts, newName,
            {memory: {role: 'harvester'}});
        buildingQueued = true
    }
    
    
    var maintainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'maintainer');

    if (maintainers.length < neededMaintainers && !buildingQueued){
        var newName = 'Maintainer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(workerParts, newName,
            {memory: {role: 'maintainer', mining: true}});
        buildingQueued = true
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if (builders.length < neededBuilders && !buildingQueued){
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(workerParts, newName,
            {memory: {role: 'builder', mining: true}});
        buildingQueued = true
    }
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    if (repairers.length < neededRepairers && !buildingQueued){
        var newName = 'Repairer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(workerParts, newName,
            {memory: {role: 'repairer', mining: true}});
        buildingQueued = true
    }
    
    var remoteMaintainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remote_maintainer');
    
    if (remoteMaintainers.length < neededRemoteMaintainers && !buildingQueued){
        var newName = 'RemoteMaintainer' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(workerParts, newName,
            {memory: {role: 'remote_maintainer', mining: true}});
        buildingQueued = true
    }
    const turrets = Game.rooms["W32S51"].find(FIND_MY_STRUCTURES, 
        {filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER)
    }})
    for(var tur in turrets){
        turretModule.run(turrets[tur])
    }



    for(var name in Game.creeps) {
        
        
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'maintainer') {
            basicMaintainer.run(creep);
        }
        if(creep.memory.role == 'builder') {
            basicBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            basicRepairer.run(creep);
        }
        if(creep.memory.role == 'remote_maintainer') {
            remoteMaintainer.run(creep);
        }
        
    }
}
