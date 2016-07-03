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

    Login.$inject = ['$state', '$filter', 'LoginDataService'];

    function Login($state, $filter, LoginDataService) {
        var loginVm = this;
        loginVm.LoginFun = LoginFun;
        loginVm.SignUp = SignUp;

        loginVm.currentUser = {};

        loginVm.currentUser.email = "";
        loginVm.currentUser.password = "";
        var confirmPassword = "";
        activate();

        function activate() {

            var temp = LoginDataService.currentUser(); 
            
            console.log(temp);

            // loginVm.currentUser.email = temp.email;
            // loginVm.currentUser.password = temp.password;
        }


        function LoginFun() {
            $state.go('header.tasks');
        }

        function SignUp() {

            $state.go('registration');
        }
    }

})();