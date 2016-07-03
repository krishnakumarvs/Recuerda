 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('RegistrationDataService', RegistrationDataService)

     .factory('RegistrationClientDataService', RegistrationClientDataService)

     .factory('RegistrationPersistenceDataService', RegistrationPersistenceDataService);

     RegistrationDataService.$inject = ['RegistrationClientDataService'];

     function RegistrationDataService(RegistrationClientDataService) {
         var registrationDataService = {
             addNewUser: addNewUser
         };

         return registrationDataService;


         function addNewUser(newUser) {
             RegistrationClientDataService.addNewUser(newUser);
         }
     }

     RegistrationClientDataService.$inject = ['$q', 'localStorageService'];

     function RegistrationClientDataService($q, localStorageService) {
         var registrationClientDataService = {
             addNewUser: addNewUser
         };
         return registrationClientDataService;

         function addNewUser(newUser) {
             console.log(newUser);

             localStorageService.set("user", newUser);
         }
     }

     RegistrationPersistenceDataService.$inject = [];

     function RegistrationPersistenceDataService() {
         var registrationPersistenceDataService = {};
         return registrationPersistenceDataService;
     }
 })();