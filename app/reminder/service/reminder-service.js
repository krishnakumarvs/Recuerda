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
            getAllReminders: getAllReminders,
            storeReminderDetails: storeReminderDetails
        };
        return reminderDataService;

        function getAllReminders() {
            return ReminderPersistenceDataService.getAllReminders();
        }
        function storeReminderDetails(reminderDetails){
            return ReminderClientDataService.storeReminderDetails(reminderDetails);
        }


    }

    ReminderClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function ReminderClientDataService($q, localStorageService, config) {
        var reminderClientDataService = {
            getAllReminders: getAllReminders,
            storeReminderDetails: storeReminderDetails
        };
        return reminderClientDataService;

        function getAllReminders() {
            var defer = $q.defer();
            var reminderDetails = localStorageService.get(config.localStorageKeys.reminderDetails);
            console.log(reminderDetails);
            defer.resolve(reminderDetails);



            return defer.promise;
        }
         function storeReminderDetails(reminderDetails){
            var defer = $q.defer();
             localStorageService.set(config.localStorageKeys.reminderDetails, reminderDetails);
             //console.log(111);
             //console.log(reminderDetails);
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

                var ref = firebase.database().ref(userUniqueKey + "/" + config.firebaseKeys.reminder).orderByChild("creation");

                var query;
                query = ref.equalTo(null);

                query.once("value", function(dataFetch) {
                    //console.log(dataFetch.val());
                    defer.resolve(dataFetch.val());

                }, function(error) {
                    console.log(error);
                });

            });
            return defer.promise;
        }
    }
})();