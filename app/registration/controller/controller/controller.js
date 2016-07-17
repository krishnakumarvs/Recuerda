(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Registration Controller.
     */
    .controller('RegistrationController', Registration);

    Registration.$inject = ['$state', '$filter', 'RegistrationDataService'];

    function Registration($state, $filter, RegistrationDataService) {
        var registrationVm = this;
        registrationVm.confirmPassword = confirmPassword;
        registrationVm.addNewUser = addNewUser;
        registrationVm.newUser = {};

        registrationVm.newUser.email = "";
        registrationVm.newUser.password = "";
        var confirmPassword = "";

        function addNewUser() {
            if (registrationVm.newUser.password == registrationVm.confirmPassword) {
                firebase.auth().createUserWithEmailAndPassword(registrationVm.newUser.email, registrationVm.newUser.password).then(function(response) {
                    RegistrationDataService.storeUserDetails(response).then(function() {
                        alert("Successfully registered. Please login");
                        $state.go('login');
                    }).catch(function() {
                        alert("Could register, please try after some time");
                    });
                }).catch(function(error) {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
            } else {
                alert("password do not match");
            }
        }

    }

})();