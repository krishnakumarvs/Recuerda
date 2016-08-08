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

            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }

        function getDay() {
            var a = new Date().getTime();
           // console.log(a); // Now
            // console.log(a.toString());
            var b = new Date(viewTaskVm.getTaskDetails.taskDate);
            var d = (b - a); 
            //console.log(b);
             //console.log(111);
            if (d > 0) {
                // difference in milliseconds 
                var oneDay = 24 * 60 * 60 * 1000;
                var w = parseInt((d / oneDay)+1);
               // console.log(d / oneDay);
            } else if (d < 0) {
               var w=0;
            }
            return w;
        }


    }

})();