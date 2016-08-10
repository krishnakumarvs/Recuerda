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
        loginVm.currentUser.email = "kk@gmail.com";
        loginVm.currentUser.password = "kk1234";

        // Function declarations
        loginVm.authinticateUser = authinticateUser;
        loginVm.SignUp = SignUp;

        activate();

        function activate() {
            LoginDataService.getUserDetails().then(function(response) {
                loginVm.currentUser.email = response.email;
            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }


        function authinticateUser() {
            firebase.auth().signInWithEmailAndPassword(loginVm.currentUser.email, loginVm.currentUser.password).then(function(response) {
                //console.log(response);
                
                LoginDataService.storeUserDetails(response).then(function() {
                   $state.go('header.tasks'); 
                });
            }).catch(function(error) {
                alert(error.message);
            });
        }

        function SignUp() {
            $state.go('registration');
        }
    }

})();