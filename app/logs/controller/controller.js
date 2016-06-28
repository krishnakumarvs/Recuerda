

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

    Logs.$inject = ['$state'];

    function Logs($state) {
        var logsVm = this;
        logsVm.allItems=reminder;
        var reminder  = [
        {
            name : "gfh",
            date : "123",
            status: "done"
        },
        {
            name : "bak",
            date : "123",
            status: "done"
        },
        {
            name : "dLjddaj",
            date : "123",
            status: "done"
        }
        ];
        var tasks= [
        {
            name : "gfh",
            date : "123",
            status: "done"
        }
        ];

        logsVm.allItems=reminder;
        function remind(){
            logsVm.allItems=reminder;
        }
        function task(){
            logsVm.allItems=task;
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