var roleWaller = require('role.waller');

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0){
        	creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
        	creep.memory.working = true;
        }
        
        if (creep.memory.working == true){
            var roomName = 'W33N31';
            var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
            // if there are hostiles
            if(hostiles.length > 0) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_TOWER) &&
                    (s.energy < s.energyCapacity)
                });
                if (structure != undefined){
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(structure, {visualizePathStyle: {stroke: '#f4ee42'}})
                    }
                }
            } // else - no hostiles
            else{
                // find spawn or extension
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || 
                                    s.structureType == STRUCTURE_EXTENSION) &&
                                    (s.energy < s.energyCapacity)
                });
                // if spawn or extension exists
                if (structure != undefined){
                    // if in range, transfer, otherwise moveTo
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
                        roleWaller.run(creep);
                    }
                }
            }
        }
        else{
            
        // 	var source = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        //     // 	var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
        //     if (source == undefined){
        //         source = creep.pos.findClosestByPath(FIND_SOURCES);
        //     }
        	var source = creep.pos.findClosestByPath(FIND_SOURCES);
        	if (creep.harvest(source) == ERR_NOT_IN_RANGE){
        		creep.moveTo(source, {visualizePathStyle: {stroke: '#f4ee42'}});
        	}
        	
        }
    }
};