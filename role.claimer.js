module.exports = {
    run: function(creep){
        
	      if (creep.room.name == creep.memory.target){
	      	if(creep.room.controller) {
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        	}
	      }
	      else{
	          var exit = creep.room.findExitTo(creep.memory.target);
	          creep.moveTo(creep.pos.findClosestByRange(exit));
	      }
    }
};