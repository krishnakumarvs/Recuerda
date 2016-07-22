(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * AddReminder Controller.
         */
        .controller('AddReminderController', AddReminder);

    AddReminder.$inject = ['$state','$filter', 'AddReminderDataService'];

    function AddReminder($state, $filter, AddReminderDataService) {
        var addReminderVm = this;

        addReminderVm.priorityChanged = priorityChanged;
        addReminderVm.addNewReminder = addNewReminder;

        addReminderVm.newReminder = {}
        addReminderVm.newReminder.reminderName = "Enter your reminder Here";

        //addTaskVm.newTask.taskDate = new Date();


        addReminderVm.newReminder.reminderDate = $filter('date')(new Date(), 'MM/dd/yyyy');
        console.log(addReminderVm.newReminder.reminderDate);

        addReminderVm.newReminder.reminderPriority = "medium";
        addReminderVm.newReminder.reminderDescription = "Description";


        function priorityChanged() {
            if (addReminderVm.newReminder.priorityBar > 0 && addReminderVm.newReminder.priorityBar <= 35) {
                addReminderVm.newReminder.reminderPriority = "low";
            } else if (addReminderVm.newReminder.priorityBar > 35 && addReminderVm.newReminder.priorityBar <= 70) {
                addReminderVm.newReminder.reminderPriority = "medium";
            } else if (addReminderVm.newReminder.priorityBar > 70 && addReminderVm.newReminder.priorityBar <= 100) {
                addReminderVm.newReminder.reminderPriority = "high";
            }
        }

        function addNewReminder() {
            AddReminderDataService.addNewReminder(addReminderVm.newReminder);
        }

    }

    /*function authenticateUser() {
            APIServices.login(loginVm.reg_num, loginVm.password).then(function(result) {
                if (result == "password_wrong") {
                    alert("Password is wrong");
                } else if (result == "no_such_reg_num") {
                    alert("No such register number")
                } else {
                    $state.go("header.dashboard");
                }
            });
        }*/

})();