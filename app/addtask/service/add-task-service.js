(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     * Add task data service.
     */
    .factory('AddTaskDataService', AddTaskDataService)

    .factory('AddTaskClientDataService', AddTaskClientDataService)

    .factory('AddTaskPersistenceDataService', AddTaskPersistenceDataService);

    AddTaskDataService.$inject = ['AddTaskClientDataService'];

    function AddTaskDataService(AddTaskClientDataService) {
        var addTaskDataService = {
            addNewTask: addNewTask
        };

        return addTaskDataService;


        function addNewTask(newTask) {
            AddTaskClientDataService.addNewTask(newTask);
        }

        /*function getMealListItems() {
            return MealPLanClientDataService.getMealListItems() || MealPlanPersistenceDataService.getMealListItems();
        }*/
    }





    AddTaskClientDataService.$inject = ['$q', 'localStorageService'];

    function AddTaskClientDataService($q, localStorageService) {
        var addTaskClientDataService = {
            addNewTask: addNewTask
        };
        return addTaskClientDataService;

        function addNewTask(newTask) {
            console.log(newTask);
            var previousTasks = localStorageService.get("allTasks");
            if (previousTasks) {

            } else {
                previousTasks = [];
            }
            previousTasks.push(newTask);
            localStorageService.set("allTasks", previousTasks);
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


        /*function getMealListItems() {
            var defer = $q.defer();
            var formattedDate = SharedService.getSelectedDay('formattedDate');
            var foundInLocalStorage = false;
            var localStorageEntry = localStorageService.get("hirs.savedFoodDetails");
            if (localStorageEntry && localStorageEntry[formattedDate]) {
                defer.resolve(localStorageEntry[formattedDate]);
                foundInLocalStorage = true;
            }
            return (foundInLocalStorage) ? defer.promise : false;
        }*/

        /*function storeFoodDetailToLocalStorage(foodItems) {
            var formattedDate = SharedService.getSelectedDay('formattedDate');
            var localStorageEntry = {};
            localStorageEntry = localStorageService.get("hirs.savedFoodDetails") || localStorageEntry;
            localStorageEntry[formattedDate] = foodItems;
            localStorageService.set('hirs.savedFoodDetails', localStorageEntry);
        }*/

        /*function deleteItemFromLocalStorage(item) {
            var formattedDate = SharedService.getSelectedDay('formattedDate');
            var localStorageEntry = {};
            var deleteOnce = false;
            localStorageEntry = localStorageService.get("hirs.savedFoodDetails") || localStorageEntry;
            var foodItems = (localStorageEntry[formattedDate]) ? localStorageEntry[formattedDate] : [];
            angular.forEach(foodItems, function(eachItem, key) {
                if (!deleteOnce && (eachItem.food_id == item.food_id) && (eachItem.entity_id == item.entity_id) && (eachItem.consumedunit == item.consumedunit)) {
                    foodItems.splice(key, 1);
                    deleteOnce = true;
                }
            });
            localStorageEntry[formattedDate] = foodItems;
            localStorageService.set('hirs.savedFoodDetails', localStorageEntry);
        }*/

    }

    AddTaskPersistenceDataService.$inject = [];

    function AddTaskPersistenceDataService() {
        var addTaskPersistenceDataService = {};
        return addTaskPersistenceDataService;
    }
})();