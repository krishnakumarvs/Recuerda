(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('TaskPageController', Tasks);

    Tasks.$inject = ['$state'];

    function Tasks($state) {
        var tasksVm = this;


        var tasks = [{
            name: "Buy apple",
            date: "today "
        }, {
            name: "book flight tckt",
            date: "today evening"
        }, {
            name: "Get job",
            date: "tomorrow"
        }, {
            name: "Marriage function",
            date: "last sunday"

        }, {
            name: "Class meeting",
            date: "6.07.2016"

        }];

        tasksVm.tasks = tasks;
        
    
        function addTask(){
            $state.go('header.addtask');
        }

        tasksVm.addTask=addTask;

}
})();