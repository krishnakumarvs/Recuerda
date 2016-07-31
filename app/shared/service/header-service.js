(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     *  Header service.
     */
    .factory('HeaderDataService', HeaderDataService)

    .factory('HeaderClientDataService', HeaderClientDataService)

    .factory('HeaderPersistenceDataService', HeaderPersistenceDataService);

    HeaderDataService.$inject = ['HeaderClientDataService'];

    function HeaderDataService(HeaderClientDataService) {
        var headerDataService = {
            getUserUniqueKey: getUserUniqueKey
        };

        return headerDataService;

        function getUserUniqueKey() {
            return HeaderClientDataService.getUserUniqueKey();
        }
    }

    HeaderClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function HeaderClientDataService($q, localStorageService, config) {
        var headerClientDataService = {
            getUserUniqueKey: getUserUniqueKey
        };
        return headerClientDataService;

        function getUserUniqueKey() {
            var defer = $q.defer();
            var userDetails = localStorageService.get(config.localStorageKeys.userDetails);
            if (!userDetails) {
                defer.reject("User is not registered yet!");
            } else {
                defer.resolve(userDetails.uid);
            }
            return defer.promise;
        }
    }

    HeaderPersistenceDataService.$inject = [];

    function HeaderPersistenceDataService() {
        var newHeaderPersistenceDataService = {};
        return HeaderPersistenceDataService;
    }
})();