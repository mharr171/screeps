require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWaller = require('role.waller');
var roleLongHarvester = require('role.longharvester');
var roleClaimer = require('role.claimer');

module.exports.loop = function(){

	for (let name in Memory.creeps){
		if (Game.creeps[name] == undefined){
			delete Memory.creeps[name];
		}
	}
    var logFreq = 25;

	var numCreeps = Object.keys(Game.creeps).length
	var maxHarvesters = 3;
	var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester')
	var maxUpgraders = 1;
	var numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader')
	var maxBuilders = 1;
	var numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder')
	var maxRepairers = 1;
	var numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer')
	var maxWallers = 1;
	var numWallers = _.sum(Game.creeps, (c) => c.memory.role == 'waller')
  var numLongHarvestersW34N31 = _.sum(Game.creeps, (c) => c.memory.role == 'longharvester' && c.memory.target == 'W34N31')
  var maxLongHarvestersW34N31 = 4;
	var numClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
	var maxClaimers = 1;
// 	if (Game.rooms['W34N31'].controller.reservation.ticksToEnd < 2500){
// 	    maxClaimers = 2;
// 	}
	var maxCreeps = maxHarvesters + maxUpgraders + maxBuilders + maxRepairers + maxWallers + maxClaimers + maxLongHarvestersW34N31;
	var energy = Game.spawns['Spawn'].room.energyCapacityAvailable * 0.5;
	var avail_energy = Game.spawns['Spawn'].room.energyAvailable;
	var energy_needed = energy * (numCreeps / (maxCreeps-1))
	if (energy_needed < 200){
		energy_needed = 200;
	}
	else if (energy_needed > energy){
	    energy_needed = energy;
	}
	if (Game.time%logFreq == 0){
    	console.log("max: " + energy);
	    console.log("ned: " + energy_needed);
	    console.log("hav: " + avail_energy);
	}
	if (avail_energy >= energy_needed && avail_energy >= 200){
		if (numHarvesters < maxHarvesters && maxHarvesters !== 0){
			// console.log('harvesters');
			// Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'H'+(numHarvesters+1), {memory:{working:false,role:'harvester'}});
			// Game.spawns['Spawn'].createCustomCreep(energy,'harvester');	
			Game.spawns['Spawn'].createCustomCreep(avail_energy,'harvester');	
		}
		else if (numUpgraders < maxUpgraders && maxUpgraders !== 0){
			// console.log('upgraders');
			// Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'U'+(numUpgraders+1), {memory:{working:false,role:'upgrader'}});
			Game.spawns['Spawn'].createCustomCreep(avail_energy,'upgrader');
		}
		else if (numWallers < maxWallers && maxWallers !== 0){
			// console.log('wallers');
			// Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'W'+(numWallers+1), {memory:{working:false,role:'waller'}});
			Game.spawns['Spawn'].createCustomCreep(avail_energy,'waller');
		}
		else if (numClaimers < maxClaimers && maxClaimers !== 0){
			Game.spawns['Spawn'].createClaimer(avail_energy,'W33N31','W34N31');
		}
		else if (numRepairers < maxRepairers && maxRepairers !== 0){
			// console.log('repairers');
			// Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'R'+(numRepairers+1), {memory:{working:false,role:'repairer'}});
			Game.spawns['Spawn'].createCustomCreep(avail_energy,'repairer');
		}
		else if (numBuilders < maxBuilders && maxBuilders !== 0){
			// console.log('builders');
			// Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'B'+(numBuilders+1), {memory:{working:false,role:'builder'}});
			Game.spawns['Spawn'].createCustomCreep(avail_energy,'builder');
		}
		else if (numLongHarvestersW34N31 < maxLongHarvestersW34N31 && maxLongHarvestersW34N31 != 0){
		    Game.spawns['Spawn'].createLongHarvester(1100,'W33N31','W34N31','5bbcab1c9099fc012e632d8c');
		}
		else{
			// var n = numCreeps % 4
			// if (n == 0){
			// Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'H-'+Game.time, {memory:{working:false,role:'harvester'}});
			// }
			// else if (n == 1){
			// 	Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'U-'+Game.time, {memory:{working:false,role:'upgrader'}});
			// }
			// else if (n == 2){
			// 	Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'B-'+Game.time, {memory:{working:false,role:'builder'}});
			// }
			// else {
			// 	Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'R-'+Game.time, {memory:{working:false,role:'repairer'}});
			// }

			// Game.spawns['Spawn'].spawnCreep([WORK,WORK,MOVE,CARRY],'H-'+Game.time, {memory:{working:false,role:'harvester'}});
		}
	}
	else if (numHarvesters == 0){
		Game.spawns['Spawn'].createCustomCreep(200,'harvester');	
	}
	
	// console.log(numBuilders + " builders");
    if (Game.time%logFreq == 0){
    	console.log(numCreeps + "/" + maxCreeps + " creeps => " + numHarvesters + "/" + maxHarvesters + " harvesters, " + numUpgraders + "/" + maxUpgraders + " upgraders, " + numBuilders + "/" + maxBuilders + " builders, " + numRepairers + "/" + maxRepairers + " repairers, " + numWallers + "/" + maxWallers + " wallers, " + numLongHarvestersW34N31 + "/" + maxLongHarvestersW34N31 + " LDH-W34N31");
	    console.log(`${Math.floor(Game.gcl.progress/Game.gcl.progressTotal*10000)/100}% GCL progress`);
	   // console.log(Game.time);
    }
	for (let name in Game.creeps){
		var creep = Game.creeps[name]
        if (creep.memory.role == 'harvester'){
          roleHarvester.run(creep);
        }
				if (creep.memory.role == 'upgrader'){
          roleUpgrader.run(creep);
        }
				if (creep.memory.role == 'builder'){
          roleBuilder.run(creep);
        }
				if (creep.memory.role == 'repairer'){
          roleRepairer.run(creep);
        }
				if (creep.memory.role == 'waller'){
          roleWaller.run(creep);
        }
        		if (creep.memory.role == 'claimer'){
          roleClaimer.run(creep);
        }
        if (creep.memory.role == 'longharvester'){
          roleLongHarvester.run(creep);
        }
		
	}
// 	var tower = Game.getObjectById('5bcfc1c1f23bae3c3ec4e952');
	var towers = Game.rooms['W33N31'].find(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_TOWER)
                });
  for (let tower of towers){
          
      if(tower) {
    	  var roomName = 'W33N31';
          var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    	    if(hostiles.length > 0) {
    	        var username = hostiles[0].owner.username;
    	        Game.notify(`User ${username} spotted in room ${roomName}`);
    	        console.log(`User ${username} spotted in room ${roomName}`);
    	        tower.attack(hostiles[0]);
    	    }
    	    else {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
                });
                if (closestDamagedStructure == undefined){
                    closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax/10000
                    });
                }
                if(closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
                else{
                    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax
                    });
                    if(closestDamagedStructure){
                        tower.repair(closestDamagedStructure);
                    }
                }
    	    }
          
      }	
  }


}