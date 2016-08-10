(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)

    /**
     * Add task data service.
     */
    .factory('TaskDataService', TaskDataService)

    .factory('TaskClientDataService', TaskClientDataService)

    .factory('TaskPersistenceDataService', TaskPersistenceDataService);

    TaskDataService.$inject = ['TaskClientDataService', 'TaskPersistenceDataService'];

    function TaskDataService(TaskClientDataService, TaskPersistenceDataService) {
        var taskDataService = {
            getAllTasks: getAllTasks,
            storeTaskDetails: storeTaskDetails
        };
        return taskDataService;

        function getAllTasks() {
            return TaskPersistenceDataService.getAllTasks();
        }
        function storeTaskDetails(taskDetails){
            return TaskClientDataService.storeTaskDetails(taskDetails);
        }


    }

    TaskClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function TaskClientDataService($q, localStorageService, config) {
        var taskClientDataService = {
            getAllTasks: getAllTasks,
            storeTaskDetails:storeTaskDetails
        };
        return taskClientDataService;

        function getAllTasks() {
            var defer = $q.defer();
            var taskDetails = localStorageService.get(config.localStorageKeys.userDetails);
            defer.resolve(taskDetails);



            return defer.promise;
        }
         function storeTaskDetails(taskDetails){
            var defer = $q.defer();
             localStorageService.set(config.localStorageKeys.taskDetails, taskDetails);
             //console.log(111);
             //console.log(taskDetails);
             defer.resolve(true);
             return defer.promise;
        }


    }

    TaskPersistenceDataService.$inject = ['$q', 'config', 'HeaderDataService'];

    function TaskPersistenceDataService($q, config, HeaderDataService) {
        var newTaskPersistenceDataService = {
            getAllTasks: getAllTasks
        };
        return newTaskPersistenceDataService;

        function getAllTasks() {
            var defer = $q.defer();
            console.log("userUniqueKey");
            HeaderDataService.getUserUniqueKey().then(function(userUniqueKey) {
                console.log("userUniqueKey : " + userUniqueKey);
                var ref = firebase.database().ref(userUniqueKey + "/" + config.firebaseKeys.task).orderByChild("creation");
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