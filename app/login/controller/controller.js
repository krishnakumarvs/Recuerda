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
        // Variable declarations
        loginVm.currentUser = {};
        loginVm.currentUser.email = "";
        loginVm.currentUser.password = "";

        // Function declarations
        loginVm.authinticateUser = authinticateUser;
        loginVm.SignUp = SignUp;

        activate();

        function activate() {

        }


        function authinticateUser() {
            firebase.auth().signInWithEmailAndPassword(loginVm.currentUser.email, loginVm.currentUser.password).then(function(response) {
                //console.log(response);
                $state.go('header.tasks');
            }).catch(function(error) {
                alert(error.message);
            });
        }

        function SignUp() {
            $state.go('registration');
        }
    }

})();