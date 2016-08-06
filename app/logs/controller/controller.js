(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('LogsController', Logs);

    Logs.$inject = ['$state', '$filter', 'LogsDataService'];

    function Logs($state, $filter, LogsDataService) {
        var logsVm = this;
        logsVm.reminderClicked = reminderClicked;
        logsVm.tasksClicked = tasksClicked;
        logsVm.getTaskDetails = {};

        activate();

        function activate() {
            LogsDataService.getTaskDetails().then(function(taskDetails) {
                console.log(taskDetails);
                logsVm.getTaskDetails.taskName = taskDetails.taskName;
                logsVm.getTaskDetails.taskDescription = taskDetails.taskDescription;
                logsVm.getTaskDetails.taskDate = taskDetails.taskDate;
                logsVm.getTaskDetails.taskPriority = taskDetails.taskPriority;

            }).catch(function(error) {
                // No user details found which means user haven't registered
            });

            LogsDataService.getReminderDetails().then(function(reminderDetails) {
                console.log(reminderDetails);
                viewReminderVm.getReminderDetails.reminderName = reminderDetails.reminderName;
                viewReminderVm.getReminderDetails.reminderDescription = reminderDetails.reminderDescription;
                viewReminderVm.getReminderDetails.reminderDate = reminderDetails.reminderDate;
                viewReminderVm.getReminderDetails.reminderPriority = reminderDetails.reminderPriority;

            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }

        function reminderClicked() {
           
        }

        function tasksClicked() {
            LogsDataService.getTaskDetails().then(function(taskDetails) {
                console.log(taskDetails);
                logsVm.getTaskDetails.taskName = taskDetails.taskName;
                logsVm.getTaskDetails.taskDescription = taskDetails.taskDescription;
                logsVm.getTaskDetails.taskDate = taskDetails.taskDate;
                logsVm.getTaskDetails.taskPriority = taskDetails.taskPriority;

            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }
    }
})();