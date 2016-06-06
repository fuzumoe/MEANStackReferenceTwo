angular.module('storyController', ['storyService'])
  
.controller('StoryController', function(story,socketio) {
	var vm = this;
	this.storyData ={};

//    vm.storyData = {};
	story.allStory().success(function(data) {
		
		vm.stories = data;
	  
	}); 
	vm.createStory = function() {
	      console.log(vm.storyData.content);
		   vm.message = "";
//		 console.log(vm.storyData.content);
//			vm.storyData.content = "123";
		story.createStory(vm.storyData).success(function(data) {
			
			vm.storyData = "";
			vm.message = data.message;
 	    vm.stories.push(data);

		});

	};
	socketio.on('story',function(data){
		vm.stories.push(data);
	});

});
