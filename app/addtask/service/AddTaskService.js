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

     AddTaskDataService.$inject = ['AddTaskClientDataService', 'AddTaskPersistenceDataService'];

     function AddTaskDataService(AddTaskClientDataService, AddTaskPersistenceDataService) {
         var addTaskDataService = {
             addNewTask: addNewTask
         };

         return addTaskDataService;


         function addNewTask(newTask) {
             return AddTaskPersistenceDataService.addNewTask(newTask);
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
     }

     AddTaskPersistenceDataService.$inject = ['$q', 'config', 'HeaderDataService'];

     function AddTaskPersistenceDataService($q, config, HeaderDataService) {
         var addTaskPersistenceDataService = {
             addNewTask: addNewTask
         };
         return addTaskPersistenceDataService;

         function addNewTask(newTask) {
             console.log(newTask);
             var defer = $q.defer();

             HeaderDataService.getUserUniqueKey().then(function(userUniqueKey) {
                 console.log("userUniqueKey : " + userUniqueKey);
                 firebase.database().ref(userUniqueKey + "/" + config.firebaseKeys.task).push(newTask);
                 defer.resolve(true);
             });
             return defer.promise;
         }
     }
 })();