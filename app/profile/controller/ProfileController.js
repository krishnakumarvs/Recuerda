(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Profile Controller.
     */
    .controller('ProfileController', Profile);

    Profile.$inject = ['$state', '$filter', 'ProfileDataService'];

    function Profile($state, $filter, ProfileDataService) {
        var profileVm = this;

        profileVm.profileDetails = {}
        profileVm.profileDetails.userName = "";
        profileVm.profileDetails.email = "";
        profileVm.profileDetails.emailVerified = "";

        activate();

        function activate() {


            ProfileDataService.getProfileDetails().then(function(response) {
                profileVm.profileDetails.userName = response.email;
                profileVm.profileDetails.email = response.email;
                profileVm.profileDetails.emailVerified = response.emailVerified;
                console.log(response);
            }).catch(function(error) {
                alert(error);
            });



            /*ProfileDataService.getProfileDetails().then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
                alert(error);
            });*/
        }


    }

})();