var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }
        
        if (creep.memory.working == true){
            var contruct_site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (contruct_site != undefined){
                if (creep.build(contruct_site) == ERR_NOT_IN_RANGE){
                    creep.moveTo(contruct_site, {visualizePathStyle: {stroke: '#4433ff'}})
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else{
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source, {visualizePathStyle: {stroke: '#44ff33'}});
            }
            else{
        	    var flag = creep.pos.findClosestByRange(FIND_FLAGS);
        	    creep.moveTo(flag);
        	}
        }
    }
};