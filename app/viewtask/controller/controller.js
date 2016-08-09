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

    ViewTask.$inject = ['$state', '$filter', 'ViewTaskDataService'];

    function ViewTask($state, $filter, ViewTaskDataService) {
        var viewTaskVm = this;
        viewTaskVm.getTaskDetails = {};
        viewTaskVm.getDay = getDay;
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
                viewTaskVm.getTaskDetails.taskDateMilli = taskDetails.taskDateMilli;


            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }

        function getDay() {
            var currentDay = new Date().getTime();
            var taskDay = viewTaskVm.getTaskDetails.taskDateMilli;
            var difference = (taskDay - currentDay);
            if (difference > 0) {
                difference = difference / 1000; //sec
                if (difference >= 60) {
                    difference = difference / 60; //min
                    if (difference >= 60) {
                        difference = difference / 60; //hr
                        if (difference >= 24) {
                            difference = difference / 24; //day
                            difference = parseInt(difference) + 1 + " days"; //day
                        } else {
                            difference = parseInt(difference) + " hour";
                        }
                    } else {
                        difference = parseInt(difference) + " minutes";
                    }
                } else {
                    difference = difference + " seconds";
                }
            } else {
                return "completed";
            }
            return difference;
        }


    }

})();