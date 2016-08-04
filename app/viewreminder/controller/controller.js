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