 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('ViewTaskDataService', ViewTaskDataService)

     .factory('ViewTaskClientDataService', ViewTaskClientDataService)

     .factory('ViewTaskPersistenceDataService', ViewTaskPersistenceDataService);

     ViewTaskDataService.$inject = ['ViewTaskClientDataService'];

     function ViewTaskDataService(ViewTaskClientDataService) {
         var viewTaskDataService = {
             getTaskDetails: getTaskDetails
            
         };

         return viewTaskDataService;

         function getTaskDetails() {
             return ViewTaskClientDataService.getTaskDetails();
         }
        
     }

     ViewTaskClientDataService.$inject = ['$q', 'localStorageService', 'config'];

     function ViewTaskClientDataService($q, localStorageService, config) {
         var viewTaskClientDataService = {
             getTaskDetails: getTaskDetails
           
         };
         return viewTaskClientDataService;

         function getTaskDetails() {
             var defer = $q.defer();
             var taskDetails = localStorageService.get(config.localStorageKeys.taskDetails);
             if (taskDetails) {
                //console.log(taskDetails);
                 defer.resolve(taskDetails);
             } else {
                 defer.reject();
             }
             return defer.promise;
         }
         

     }

     ViewTaskPersistenceDataService.$inject = [];

     function ViewTaskPersistenceDataService() {
         var viewTaskPersistenceDataService = {};
         return viewTaskPersistenceDataService;
     }
 })();