(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('ViewReminderController', ViewReminder);
//<script src="TaskPageController.js"></script>//
    ViewReminder.$inject = ['$state','$filter','ViewReminderDataService'];

    function ViewReminder($state,$filter,ViewReminderDataService) {
        var viewReminderVm = this;
        viewReminderVm.getReminderDetails = {};
         viewReminderVm.getDay = getDay;
        activate();
        function activate() {
            ViewReminderDataService.getReminderDetails().then(function(reminderDetails) {
                console.log(reminderDetails);
                viewReminderVm.getReminderDetails.reminderName = reminderDetails.reminderName;
                viewReminderVm.getReminderDetails.reminderDescription = reminderDetails.reminderDescription;
                viewReminderVm.getReminderDetails.reminderDate = reminderDetails.reminderDate;
                viewReminderVm.getReminderDetails.reminderPriority = reminderDetails.reminderPriority;

            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }
        function getDay() {
            var a = new Date().getTime();
         console.log(a); // Now
            // console.log(a.toString());
            var b = new Date(viewReminderVm.getReminderDetails.reminderDate);
            var d = (b - a); 
            console.log(b);
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

        // var viewReminder = [{
        //     name: "Buy apple",
        //     date: "today "
        // }, {
        //     name: "book flight tckt",
        //     date: "today evening"
        // }, {
        //     name: "Get job",
        //     date: "tomorrow"
        // }, {
        //     name: "Marriage function",
        //     date: "last sunday"

        // }, {
        //     name: "Class meeting",
        //     date: "6.07.2016"

        // }];

        // viewReminder.tasks = tasks;
        
    
        // function addTask(){
        //     $state.go('header.addtask');
        // }

      //  tasksVm.addTask=addTask;

}
})();