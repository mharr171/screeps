var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0){
          creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
          creep.memory.working = true;
        }
        
        if (creep.memory.working == true){
      //     var low_health = 1000;
						// do {
	     //        hurt_structs = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						// 		filter: (e) => e.hits < e.hitsMax && e.structureType != STRUCTURE_WALL
						// 	});
						// 	low_health += 50000;
						// }while (hurt_structs == undefined || low_health > 300000);
						hurt_structs = creep.pos.findClosestByPath(FIND_STRUCTURES, {
							filter: (e) => e.hits < e.hitsMax/40 && e.structureType != STRUCTURE_WALL});

            if (hurt_structs != undefined){
                if (creep.repair(hurt_structs) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hurt_structs, {visualizePathStyle: {stroke: '#ff3344'}})
                }
            }
						else {
                roleBuilder.run(creep);
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