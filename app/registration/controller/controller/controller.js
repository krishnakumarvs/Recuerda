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

    Registration.$inject = ['$state', '$filter', 'RegistrationDataService', 'config'];

    function Registration($state, $filter, RegistrationDataService, config) {
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
                        alert(config.uiMessages.registerationSuccess);
                        $state.go('login');
                    }).catch(function() {
                        alert(config.uiMessages.registerationFailed);
                    });
                }).catch(function(error) {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
            } else {
                alert(uiMessages.incorrectPassword.config);
            }
        }

    }

})();