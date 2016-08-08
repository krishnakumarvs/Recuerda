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

    LogsDataService.$inject = ['LogsClientDataService', 'LogsPersistenceDataService'];

    function LogsDataService(LogsClientDataService, LogsPersistenceDataService) {
        var logsDataService = {
            tasksClicked: tasksClicked,
            reminderClicked: reminderClicked
        };

        return logsDataService;

        function tasksClicked() {
            return LogsPersistenceDataService.tasksClicked();
        }

        function reminderClicked() {
            return LogsPersistenceDataService.reminderClicked();
        }


    }

    LogsClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function LogsClientDataService($q, localStorageService, config) {
        var logsClientDataService = {
            tasksClicked: tasksClicked,
            getReminderDetails: getReminderDetails
        };
        return logsClientDataService;

        function tasksClicked() {
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

    LogsPersistenceDataService.$inject = ['$q', 'config', 'HeaderDataService'];

    function LogsPersistenceDataService($q, config, HeaderDataService) {
        var logsPersistenceDataService = {
            tasksClicked: tasksClicked,
            reminderClicked: reminderClicked
        };
        return logsPersistenceDataService;

        function tasksClicked() {
            var defer = $q.defer();
            console.log("userUniqueKey");
            HeaderDataService.getUserUniqueKey().then(function(userUniqueKey) {
                console.log("userUniqueKey : " + userUniqueKey);
                var ref = firebase.database().ref(userUniqueKey + "/" + config.firebaseKeys.task).orderByChild("creation");
                var query;
                query = ref.equalTo(null);
                query.once("value", function(dataFetch) {
                    console.log(dataFetch.val());
                    defer.resolve(dataFetch.val());
                }, function(error) {
                    console.log(error);
                });

            });
            return defer.promise;
        }

        function reminderClicked() {
            var defer = $q.defer();
            console.log("userUniqueKey");
            HeaderDataService.getUserUniqueKey().then(function(userUniqueKey) {
                console.log("userUniqueKey : " + userUniqueKey);
                var ref = firebase.database().ref(userUniqueKey + "/" + config.firebaseKeys.reminder).orderByChild("creation");
                var query;
                query = ref.equalTo(null);
                query.once("value", function(dataFetch) {
                    console.log(dataFetch.val());
                    defer.resolve(dataFetch.val());
                }, function(error) {
                    console.log(error);
                });

            });
            return defer.promise;
        }
    }
})();