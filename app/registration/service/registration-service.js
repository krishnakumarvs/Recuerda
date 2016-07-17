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
             storeUserDetails: storeUserDetails
         };

         return registrationDataService;


         function storeUserDetails(userDetails) {
             return RegistrationClientDataService.storeUserDetails(userDetails);
         }
     }

     RegistrationClientDataService.$inject = ['$q', 'localStorageService', 'config'];

     function RegistrationClientDataService($q, localStorageService, config) {
         var registrationClientDataService = {
             storeUserDetails: storeUserDetails
         };
         return registrationClientDataService;

         function storeUserDetails(userDetails) {
             var defer = $q.defer();
             localStorageService.set(config.localStorageKeys.userDetails, userDetails);
             defer.resolve(true);
             return defer.promise;
         }
     }

     RegistrationPersistenceDataService.$inject = [];

     function RegistrationPersistenceDataService() {
         var registrationPersistenceDataService = {};
         return registrationPersistenceDataService;
     }
 })();