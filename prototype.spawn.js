module.exports = function() {
	StructureSpawn.prototype.createCustomCreep = 
		function(energy, roleName) {
			// var numOfParts = Math.floor(energy/200);
			var body = [];
			// for (let i = 0; i < numOfParts; i++){
			// 	body.push(WORK)
			// }
			// for (let i = 0; i < numOfParts; i++){
			// 	body.push(CARRY)
			// }
			// for (let i = 0; i < numOfParts; i++){
			// 	body.push(MOVE)
			// }
			var e = energy;
			var cont = true;
			var case_choice = 0;
			do {
				switch(case_choice) {
					case 1:
					    case_choice = 2;
							body.push(MOVE);
							e -= 50;
							if (e < 50){
								cont = false;
							}
					    break;
					case 2:
					    case_choice = 3;
							body.push(CARRY);
							e -= 50;
							if (e < 50){
								cont = false;
							}
					    break;
					case 3:
					    case_choice = 0;
							body.push(MOVE);
							e -= 50;
							if (e < 100){
								cont = false;
							}
					    break;
					default:
					    case_choice = 1;
							body.push(WORK);
							e -= 100;
							if (e < 50){
								cont = false;
							}
							break;
				}
			} while (cont)
			var name = roleName[0].toUpperCase() + (Game.time%3) + (Game.time%5) + (Game.time%7);
			var z = 2;
			do {
				name = roleName[0].toUpperCase() + ((Game.time*z)%3) + ((Game.time*z)%5) + ((Game.time*z)%7);
				z += 1;
			} while (Game.creeps[name] != undefined)
			return this.spawnCreep(body, name, {memory:{role:roleName,working:false}});
	};
	
	StructureSpawn.prototype.createLongHarvester = 
		function(energy, home, target, sourceIndex) {
			var body = [];
			var e = energy;
			var cont = true;
			var case_choice = 0;
			do {
				switch(case_choice) {
					case 1:
					    case_choice = 2;
							body.push(MOVE);
							e -= 50;
							if (e < 50){
								cont = false;
							}
					    break;
					case 2:
					    case_choice = 3;
							body.push(CARRY);
							e -= 50;
							if (e < 50){
								cont = false;
							}
					    break;
					case 3:
					    case_choice = 0;
					   // case_choice = 4;
							body.push(MOVE);
							e -= 50;
							if (e < 100){
				// 			if (e < 50){
								cont = false;
							}
					    break;
					case 4:
					    case_choice = 0;
							body.push(MOVE);
							e -= 50;
							if (e < 100){
								cont = false;
							}
					    break;
					default:
					    case_choice = 1;
							body.push(WORK);
							e -= 100;
							if (e < 50){
								cont = false;
							}
							break;
				}
			} while (cont)
			var name = 'LH' + (Game.time%3) + (Game.time%5) + (Game.time%7);
			var z = 2;
			do {
				name = 'LH' + ((Game.time*z)%3) + ((Game.time*z)%5) + ((Game.time*z)%7);
				z += 1;
			} while (Game.creeps[name] != undefined)
			return this.spawnCreep(body, name, {memory:{role:'longharvester',working:false,home:home,target:target,sourceIndex:sourceIndex,runs:0,altrole:0}});
	};
	StructureSpawn.prototype.createClaimer = 
		function(energy, home, target) {
			var body = [MOVE,CLAIM,CLAIM];
			var e = energy;
			
			var name = 'C' + (Game.time%3) + (Game.time%5) + (Game.time%7);
			var z = 2;
			do {
				name = 'C' + ((Game.time*z)%3) + ((Game.time*z)%5) + ((Game.time*z)%7);
				z += 1;
			} while (Game.creeps[name] != undefined)
			return this.spawnCreep(body, name, {memory:{role:'claimer',home:home,target:target}});
	};
};