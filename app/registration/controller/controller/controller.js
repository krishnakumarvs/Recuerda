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
        registrationVm.confirmPassword=confirmPassword;
        registrationVm.addNewUser=addNewUser;
        registrationVm.newUser = {};

        registrationVm.newUser.email = "";
        registrationVm.newUser.password = "";
        registrationVm.newUser.userName = "";
         var confirmPassword = "";

        function addNewUser() {
            console.log(111)
            if(registrationVm.newUser.password ==registrationVm.confirmPassword)
            {
             RegistrationDataService.addNewUser(registrationVm.newUser);  
             $state.go('login');
            }
            else{
                console.log("password does not match");
            }
        }
        
    }

})();