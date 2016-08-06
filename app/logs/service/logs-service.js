(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     * logs data service.
     */
    .factory('LogsDataService', LogsDataService)

    .factory('LogsClientDataService', LogsClientDataService)

    .factory('LogsPersistenceDataService', LogsPersistenceDataService);

    LogsDataService.$inject = ['LogsClientDataService'];

    function LogsDataService(LogsClientDataService) {
        var logsDataService = {
            getTaskDetails: getTaskDetails,
            getReminderDetails: getReminderDetails
        };

        return logsDataService;

        function getTaskDetails() {
            return LogsClientDataService.getTaskDetails();
        }

        function getReminderDetails() {
            return LogsClientDataService.getReminderDetails();
        }


    }

    LogsClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function LogsClientDataService($q, localStorageService, config) {
        var logsClientDataService = {
            getTaskDetails: getTaskDetails,
            getReminderDetails: getReminderDetails
        };
        return logsClientDataService;

        function getTaskDetails() {
            console.log(111);
            var defer = $q.defer();
            var taskDetails = localStorageService.get(config.localStorageKeys.taskDetails);
            if (taskDetails) {
                console.log(taskDetails);
                defer.resolve(taskDetails);
            } else {
                defer.reject();
            }
            return defer.promise;
        }

        function getReminderDetails() {
            var defer = $q.defer();
            var reminderDetails = localStorageService.get(config.localStorageKeys.reminderDetails);
            if (reminderDetails) {
                //console.log(reminderDetails);
                defer.resolve(reminderDetails);
            } else {
                defer.reject();
            }
            return defer.promise;
        }



    }

    LogsPersistenceDataService.$inject = [];

    function LogsPersistenceDataService() {
        var newProfilePersistenceDataService = {};
        return LogsPersistenceDataService;
    }
})();