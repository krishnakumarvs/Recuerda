(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     * Add task data service.
     */
    .factory('ReminderDataService', ReminderDataService)

    .factory('ReminderClientDataService', ReminderClientDataService)

    .factory('ReminderPersistenceDataService', ReminderPersistenceDataService);

    ReminderDataService.$inject = ['ReminderClientDataService', 'ReminderPersistenceDataService'];

    function ReminderDataService(ReminderClientDataService, ReminderPersistenceDataService) {
        var reminderDataService = {
            getAllReminders: getAllReminders
        };
        return reminderDataService;

        function getAllReminders() {
            return ReminderPersistenceDataService.getAllReminders();
        }


    }

    ReminderClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function ReminderClientDataService($q, localStorageService, config) {
        var reminderClientDataService = {
            getAllReminders: getAllReminders
        };
        return reminderClientDataService;

        function getAllReminders() {
            var defer = $q.defer();
            var reminderDetails = localStorageService.get(config.localStorageKeys.userDetails);
            defer.resolve(reminderDetails);



            return defer.promise;
        }


    }

    ReminderPersistenceDataService.$inject = ['$q', 'config', 'HeaderDataService'];

    function ReminderPersistenceDataService($q, config, HeaderDataService) {
        var newReminderPersistenceDataService = {
            getAllReminders: getAllReminders
        };
        return newReminderPersistenceDataService;

        function getAllReminders() {
            var defer = $q.defer();
            console.log("userUniqueKey");
            HeaderDataService.getUserUniqueKey().then(function(userUniqueKey) {
                console.log("userUniqueKey : " + userUniqueKey);

                var ref = firebase.database().ref(userUniqueKey + "/" + "reminder").orderByChild("creation");

                var query;
                query = ref.equalTo(null);

                query.once("value", function(dataSnapshot) {
                    //console.log(dataSnapshot.val());
                    defer.resolve(dataSnapshot.val());

                }, function(error) {
                    console.log(error);
                });

            });
            return defer.promise;
        }
    }
})();