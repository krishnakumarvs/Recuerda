(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     * Add task data service.
     */
    .factory('ProfileDataService', ProfileDataService)

    .factory('ProfileClientDataService', ProfileClientDataService)

    .factory('ProfilePersistenceDataService', ProfilePersistenceDataService);

    ProfileDataService.$inject = ['ProfileClientDataService'];

    function ProfileDataService(ProfileClientDataService) {
        var profileDataService = {
            getProfileDetails: getProfileDetails
        };

        return profileDataService;

        function getProfileDetails() {
            return ProfileClientDataService.getProfileDetails();
        }


    }

    ProfileClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function ProfileClientDataService($q, localStorageService, config) {
        var profileClientDataService = {
            getProfileDetails: getProfileDetails
        };
        return profileClientDataService;

        function getProfileDetails() {
            var defer = $q.defer();
            var profileDetails = localStorageService.get(config.localStorageKeys.userDetails);
            if (!profileDetails) {
                defer.reject("User is not registered yet!");
            } else {
                defer.resolve(profileDetails);
            }
            return defer.promise;
        }


    }

    ProfilePersistenceDataService.$inject = [];

    function ProfilePersistenceDataService() {
        var newProfilePersistenceDataService = {};
        return ProfilePersistenceDataService;
    }
})();