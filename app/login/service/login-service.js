 (function() {
     'use strict';

     /**
      * Get Shared module.
      */
     angular.module(appName)

     /**
      * Registration data service.
      */
     .factory('LoginDataService', LoginDataService)

     .factory('LoginClientDataService', LoginClientDataService)

     .factory('LoginPersistenceDataService', LoginPersistenceDataService);

     LoginDataService.$inject = ['LoginClientDataService'];

     function LoginDataService(LoginClientDataService) {
         var loginDataService = {
             currentUser: currentUser
         };

         return loginDataService;


         function currentUser(currentUser) {
             LoginClientDataService.currentUser(currentUser);
         }
     }

     LoginClientDataService.$inject = ['$q', 'localStorageService'];

     function LoginClientDataService($q, localStorageService) {
         var loginClientDataService = {
             currentUser: currentUser
         };
         return loginClientDataService;

         function currentUser() {
             var currentUserValue = localStorageService.get("user");
             console.log(currentUserValue);
             return currentUserValue;
         }
     }

     LoginPersistenceDataService.$inject = [];

     function LoginPersistenceDataService() {
         var loginPersistenceDataService = {};
         return loginPersistenceDataService;
     }
 })();

    