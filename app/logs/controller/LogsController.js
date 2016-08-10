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

    Logs.$inject = ['$state', 'LogsPersistenceDataService', 'LogsDataService'];

    function Logs($state, LogsPersistenceDataService, LogsDataService) {
        var logsVm = this;
        var taskLogs = [];
        var reminderLogs = [];
        logsVm.tasksClicked = tasksClicked;
        logsVm.reminderClicked = reminderClicked;

        function reminderClicked() {
            LogsDataService.reminderClicked().then(function(reminderDetails) {
               //console.log(11);
                logsVm.taskLogs="";
                //console.log(reminderDetails);
                logsVm.reminderLogs = reminderDetails;
            }).catch(function(error) {
                console.log(1111);
                // No user details found which means user haven't registered
            });

        }

        function tasksClicked() {
            LogsDataService.tasksClicked().then(function(allTasks) {
                logsVm.reminderLogs="";
                //console.log(allTasks);
                logsVm.taskLogs = allTasks;
            }).catch(function(error) {
               // console.log(1111);
                // No user details found which means user haven't registered
            });
        }
    }
})();