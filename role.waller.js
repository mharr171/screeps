var roleRepairer = require('role.repairer');

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
            creep.memory.working = true;
        }
        
        if (creep.memory.working == true){
						// var low_health = 10000000;
						// var hurt_structs = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						// 	filter: (e) => e.hits < e.hitsMax && e.structureType == STRUCTURE_WALL
						// });
						// do {
	     //        hurt_structs = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						// 		filter: (e) => e.hits < e.hitsMax && e.structureType == STRUCTURE_WALL
						// 	});
						// 	low_health += 50000000;
						// }while (hurt_structs == undefined || low_health > 300000000);
						var hurt_structs = creep.pos.findClosestByPath(FIND_STRUCTURES, {
							filter: (e) => e.hits < e.hitsMax/10000 && e.structureType == STRUCTURE_WALL
						});


            if (hurt_structs != undefined){
                if (creep.repair(hurt_structs) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hurt_structs, {visualizePathStyle: {stroke: '#ff3344'}})
                }
            }
            else {
                roleRepairer.run(creep);
            }
        }
        else{
          var source = creep.pos.findClosestByPath(FIND_SOURCES);
          if (creep.harvest(source) == ERR_NOT_IN_RANGE){
              creep.moveTo(source, {visualizePathStyle: {stroke: '#44ff33'}});
          }
          
        }
    }
};