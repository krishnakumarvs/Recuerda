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
             currentUser: currentUser,
             getUserDetails: getUserDetails
         };

         return loginDataService;

         function getUserDetails() {
             return LoginClientDataService.getUserDetails();
         }

         function currentUser(currentUser) {
             LoginClientDataService.currentUser(currentUser);
         }
     }

     LoginClientDataService.$inject = ['$q', 'localStorageService', 'config'];

     function LoginClientDataService($q, localStorageService, config) {
         var loginClientDataService = {
             currentUser: currentUser,
             getUserDetails: getUserDetails
         };
         return loginClientDataService;

         function getUserDetails() {
             var defer = $q.defer();
             var userDetails = localStorageService.get(config.localStorageKeys.userDetails);
             if (userDetails) {
                 defer.resolve(userDetails);
             } else {
                 defer.reject();
             }
             return defer.promise;
         }

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