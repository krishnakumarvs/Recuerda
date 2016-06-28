(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Login Controller.
     */
    .controller('LoginController', Login);

    Login.$inject = ['$state'];

    function Login($state) {
        var loginVm = this;
        loginVm.funn=funn;
        function funn(){
             $state.go('header.tasks');
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