(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('ReminderController', Reminder);

    Reminder.$inject = ['$state', 'ReminderDataService', 'ReminderPersistenceDataService'];

    function Reminder($state, ReminderDataService, ReminderPersistenceDataService) {
        var reminderVm = this;
        activate();

        function activate() {
            ReminderDataService.getAllReminders().then(function(allReminders) {
                console.log(allReminders);
                reminderVm.reminder = allReminders;
            });
        }
        var reminder = [];
        //reminderVm.reminder = reminder;

        function addReminder() {

            $state.go('header.addreminder')
        }
        reminderVm.addReminder = addReminder;

        function GotoViewReminder(item) {
            ReminderDataService.storeReminderDetails(item).then(function() {
                       $state.go('header.viewreminder')
                    }).catch(function() {
                       
                    });
            
        }
        reminderVm.GotoViewReminder = GotoViewReminder;

        function getAllReminders() {
            ReminderDataService.getAllReminders();
        }

        /*loginVm.reg_num = "234";
        loginVm.password = "123"

        loginVm.authenticateUser = authenticateUser;
        activate();*/

        /*function activate() {
            APIServices.getStudentProfile().then(function(response) {
                console.log(response);
                if (response) {
                    $state.go("header.dashboard");
                }
            });
        }*/

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
    }

})();