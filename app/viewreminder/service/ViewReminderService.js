 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('ViewReminderDataService', ViewReminderDataService)

     .factory('ViewReminderClientDataService', ViewReminderClientDataService)

     .factory('ViewReminderPersistenceDataService', ViewReminderPersistenceDataService);

     ViewReminderDataService.$inject = ['ViewReminderClientDataService'];

     function ViewReminderDataService(ViewReminderClientDataService) {
         var viewReminderDataService = {
             getReminderDetails: getReminderDetails
            
         };

         return viewReminderDataService;

         function getReminderDetails() {
             return ViewReminderClientDataService.getReminderDetails();
         }
        
     }

     ViewReminderClientDataService.$inject = ['$q', 'localStorageService', 'config'];

     function ViewReminderClientDataService($q, localStorageService, config) {
         var viewReminderClientDataService = {
             getReminderDetails: getReminderDetails
           
         };
         return viewReminderClientDataService;

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

     ViewReminderPersistenceDataService.$inject = [];

     function ViewReminderPersistenceDataService() {
         var viewReminderPersistenceDataService = {};
         return viewReminderPersistenceDataService;
     }
 })();