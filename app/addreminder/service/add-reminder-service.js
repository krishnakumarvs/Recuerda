 (function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     * Add task data service.
     */
    .factory('AddReminderDataService', AddReminderDataService)

    .factory('AddReminderClientDataService', AddReminderClientDataService)

    .factory('AddReminderPersistenceDataService', AddReminderPersistenceDataService);

    AddReminderDataService.$inject = ['AddReminderClientDataService','AddReminderPersistenceDataService'];

    function AddReminderDataService(AddReminderClientDataService,AddReminderPersistenceDataService) {
        var addReminderDataService = {
            addNewReminder: addNewReminder
        };

        return addReminderDataService;


        function addNewReminder(newReminder) {
            return AddReminderPersistenceDataService.addNewReminder(newReminder);
        }

        /*function getMealListItems() {
            return MealPLanClientDataService.getMealListItems() || MealPlanPersistenceDataService.getMealListItems();
        }*/
    }

    AddReminderClientDataService.$inject = ['$q', 'localStorageService'];

    function AddReminderClientDataService($q, localStorageService) {
        var addReminderClientDataService = {
            addNewReminder: addNewReminder
        };
        return addReminderClientDataService;

        function addNewReminder(newReminder) {
            console.log(newReminder);
            var previousReminders = localStorageService.get("allReminders");
            if (previousReminders) {

            } else {
                previousReminders = [];
            }
            previousReminders.push(newReminder);
            localStorageService.set("allReminders", previousReminders);
        }


        function getPreviousDayTotalPoints() {
            var localStorageEntry = localStorageService.get("hirs.allPoints");
            var previousDayTotalPoints = 0;
            if (localStorageEntry) {
                var lastSendDate = Object.keys(localStorageEntry)[Object.keys(localStorageEntry).length - 1];
                if (lastSendDate) {
                    previousDayTotalPoints = (localStorageEntry[lastSendDate].total_point) ? localStorageEntry[lastSendDate].total_point : 0;
                }
            }
            return previousDayTotalPoints;
        }
    }

    AddReminderPersistenceDataService.$inject = ['$q','config','HeaderDataService'];

    function AddReminderPersistenceDataService($q,config,HeaderDataService) {
        var addReminderPersistenceDataService = {
            addNewReminder:addNewReminder
        };

        return addReminderPersistenceDataService;

        function addNewReminder(newReminder){
            console.log(newReminder);
            var defer=$q.defer();
            HeaderDataService.getUserUniqueKey().then(function(userUniqueKey){
                console.log("userUniqueKey:"+ userUniqueKey);
                firebase.database().ref(userUniqueKey +"/"+config.firebaseKeys.reminder).push(newReminder);
                defer.resolve(true);
            });
            return defer.promise;

        }
    }
})();