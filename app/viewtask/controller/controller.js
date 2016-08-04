(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Login Controller.
     */
    .controller('ViewTaskController', ViewTask);

    ViewTask.$inject = ['$state','$filter','ViewTaskDataService'];

    function ViewTask($state,$filter,ViewTaskDataService) {
        var viewTaskVm = this;
        viewTaskVm.getTaskDetails = {};
       //viewTaskVm.getTaskDetails.taskName = "";
        //viewTaskVm.getTaskDetails.taskDescription = "";
       // viewTaskVm.getTaskDetails.taskDate = "";
        //viewTaskVm.getTaskDetails.taskPriority = "";
        activate();

        function activate() {
            ViewTaskDataService.getTaskDetails().then(function(taskDetails) {
                console.log(taskDetails);
                viewTaskVm.getTaskDetails.taskName = taskDetails.taskName;
                viewTaskVm.getTaskDetails.taskDescription = taskDetails.taskDescription;
                viewTaskVm.getTaskDetails.taskDate = taskDetails.taskDate;
                viewTaskVm.getTaskDetails.taskPriority = taskDetails.taskPriority;

            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }
        
                  
        
    }

})();