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
            getAllTasks: getAllTasks
        };
        return taskDataService;

        function getAllTasks() {
            return TaskPersistenceDataService.getAllTasks();
        }


    }

    TaskClientDataService.$inject = ['$q', 'localStorageService', 'config'];

    function TaskClientDataService($q, localStorageService, config) {
        var taskClientDataService = {
            getAllTasks: getAllTasks
        };
        return taskClientDataService;

        function getAllTasks() {
            var defer = $q.defer();
            var taskrDetails = localStorageService.get(config.localStorageKeys.userDetails);
            defer.resolve(taskDetails);



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

                var ref = firebase.database().ref(userUniqueKey + "/" + "task").orderByChild("creation");

                var query;
                query = ref.equalTo(null);

                query.once("value", function(dataSnapshot) {
                    //console.log(dataSnapshot.val());
                    defer.resolve(dataSnapshot.val());

                }, function(error) {
                    console.log(error);
                });

            });
            return defer.promise;
        }
    }
})();