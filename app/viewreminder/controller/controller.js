(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * Login Controller.
         */
        .controller('ViewReminderController', ViewReminder);
//<script src="TaskPageController.js"></script>//
    ViewReminder.$inject = ['$state'];

    function ViewReminder($state) {
        var viewReminderVm = this;


        // var viewReminder = [{
        //     name: "Buy apple",
        //     date: "today "
        // }, {
        //     name: "book flight tckt",
        //     date: "today evening"
        // }, {
        //     name: "Get job",
        //     date: "tomorrow"
        // }, {
        //     name: "Marriage function",
        //     date: "last sunday"

        // }, {
        //     name: "Class meeting",
        //     date: "6.07.2016"

        // }];

        // viewReminder.tasks = tasks;
        
    
        // function addTask(){
        //     $state.go('header.addtask');
        // }

      //  tasksVm.addTask=addTask;

}
})();