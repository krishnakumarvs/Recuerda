(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Task Page Controller.
     */
    .controller('TaskPageController', Tasks);

    Tasks.$inject = ['$state','TaskDataService','TaskPersistenceDataService'];

    function Tasks($state,TaskDataService,TaskPersistenceDataService){
        var tasksVm = this;
        activate();
        function activate(){
            TaskDataService.getAllTasks().then(function(allTasks) {
                console.log(allTasks);
                tasksVm.tasks = allTasks;
            });
        }


        var tasks = [{
            name: "Buy apple",
            date: "today ",
            description:"Etiam sit ametb fbf"
        }, {
            name: "book flight tckt",
            date: "today",
            description:"Etiam sit amet dfdfd dfrdgtfjh"
        }, {
            name: "Get job",
            date: "tomorrow",
            description:"Etiam sit amet fgfbf sdfrdfgdv"
        }, {
            name: "Marriage function",
            date: "sunday",
            description:"Etiam sit amet vfgbftfgh dvdfgdrfgdf"

        }];

        //tasksVm.tasks = tasks;


        function addTask() {
            $state.go('header.addtask');
        }

        tasksVm.addTask = addTask;

        function GotoViewTask(item) {
            //console.log(item);
             TaskDataService.storeTaskDetails(item).then(function() {
                        $state.go('header.viewtask')
                    }).catch(function() {
                       
                    });
                
            
        }
        tasksVm.GotoViewTask = GotoViewTask;

        function getAllReminders() {
            TaskDataService.getAllTasks();
        }


    }
})();