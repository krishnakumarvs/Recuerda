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
    ViewReminder.$inject = ['$state', '$filter', 'ViewReminderDataService','config'];

    function ViewReminder($state, $filter, ViewReminderDataService,config) {
        var viewReminderVm = this;
        viewReminderVm.getReminderDetails = {};
        viewReminderVm.getDay = getDay;
        activate();

        function activate() {
            ViewReminderDataService.getReminderDetails().then(function(reminderDetails) {
                console.log(reminderDetails);
                viewReminderVm.getReminderDetails.reminderName = reminderDetails.reminderName;
                viewReminderVm.getReminderDetails.reminderDescription = reminderDetails.reminderDescription;
                viewReminderVm.getReminderDetails.reminderDate = reminderDetails.reminderDate;
                viewReminderVm.getReminderDetails.reminderPriority = reminderDetails.reminderPriority;
                viewReminderVm.getReminderDetails.reminderDateMilli = reminderDetails.reminderDateMilli;

            }).catch(function(error) {
                // No user details found which means user haven't registered
            });
        }

        function getDay() {
            var currentDay = new Date().getTime();
            var reminderDay = viewReminderVm.getReminderDetails.reminderDateMilli;
            var difference = (reminderDay - currentDay);
            if (difference > 0) {
                difference = difference / 1000; //sec
                if (difference >= 60) {
                    difference = difference / 60; //min
                    if (difference >= 60) {
                        difference = difference / 60; //hr
                        if (difference >= 24) {
                            difference = difference / 24; //day
                            difference = parseInt(difference) + 1 + config.timePeriod.days; //day
                        } else {
                            difference = parseInt(difference) + config.timePeriod.hours;
                        }
                    } else {
                        difference = parseInt(difference) + config.timePeriod.minutes;
                    }
                } else {
                    difference = difference + config.timePeriod.seconds;
                }
            } else {
                return config.timePeriod.completed;
            }
            return difference;
        }

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