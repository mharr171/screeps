var roleWaller = require('role.waller');
var roleRepairer = require('role.repairer');

module.exports = {
    run: function(creep){
        if (creep.ticksToLive == 10){
            console.log(`${creep.name} made ${creep.memory.runs} runs (w/ ${creep.memory.altrole} altroles)`);
        }
        if (creep.memory.working == true && creep.carry.energy == 0){
        	creep.memory.working = false;
            creep.memory.runs = creep.memory.runs + 1;
            console.log(`${creep.name} made ${creep.memory.runs} runs (${creep.carryCapacity * creep.memory.runs} energy) and has ${creep.ticksToLive} ticks left.(${(1500-creep.ticksToLive)/creep.memory.runs} ticks/run, ${Math.floor(1500/((1500-creep.ticksToLive)/creep.memory.runs)) * creep.carryCapacity} lifetime est.) (w/ ${creep.memory.altrole} altroles)`);
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
        	creep.memory.working = true;
        }
        
        if (creep.memory.working == true){
            if (creep.room.name == creep.memory.home){
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || 
                                    s.structureType == STRUCTURE_EXTENSION) &&
                                    (s.energy < s.energyCapacity)
                });
                if (structure != undefined){
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#f4ee42'}})
                    }
                }
                else{
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_TOWER) &&
                                        (s.energy < s.energyCapacity)
                    });
                    if (structure != undefined){
                        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(structure, {visualizePathStyle: {stroke: '#f4ee42'}})
                        }
                    }
                    else{
                        if (creep.memory.altrole == undefined){
                            creep.memory.altrole = 0;
                        }
                        creep.memory.altrole = creep.memory.altrole + 1
                        roleWaller.run(creep);
                    }
                }
            }
            else{
                var hurt_roads = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_ROAD) &&
                                        (s.hits < s.hitsMax/2)
                    });
                if (hurt_roads != undefined){
                    if (creep.repair(hurt_roads) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hurt_roads, {visualizePathStyle: {stroke: '#ff3344'}})
                }
                }
                else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
                }
            }
        }
        else{
            if (creep.room.name == creep.memory.target){
            	var source = creep.pos.findClosestByPath(FIND_SOURCES);
            // 	var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
                // var source = Game.getObjectById(creep.memory.sourceIndex);
            	
            	if (source != undefined){
            	    if (creep.harvest(source) == ERR_NOT_IN_RANGE){
            		    creep.moveTo(source, {visualizePathStyle: {stroke: '#f4ee42'}});
            	    }
            	}
            	else{
            	    var flag = creep.pos.findClosestByRange(FIND_FLAGS);
            	    creep.moveTo(flag);
            	}
            }
            else{
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};