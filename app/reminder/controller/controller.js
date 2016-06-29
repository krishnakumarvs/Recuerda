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

    Reminder.$inject = ['$state'];

    function Reminder($state) {
        var reminderVm = this;


        var reminder = [{
                name: "Buy apple",
                date: "today "

            },

            {
                name: "Get job",
                date: "tomorrow"


            }, {
                name: "Class meeting",
                date: "6.07.2016"

            }
        ];
        reminderVm.reminder = reminder;

        function addReminder() {

            $state.go('header.addreminder')
        }
        reminderVm.addReminder = addReminder;


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