(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Login Controller.
     */
    .controller('AddtaskController', Addtask);

    Addtask.$inject = ['$state', '$filter', 'AddTaskDataService'];

    function Addtask($state, $filter, AddTaskDataService) {
        var addTaskVm = this;

        addTaskVm.priorityChanged = priorityChanged;
        addTaskVm.addNewTask = addNewTask;

        addTaskVm.newTask = {}
        addTaskVm.newTask.taskName = "sampl";

        //addTaskVm.newTask.taskDate = new Date();


        addTaskVm.newTask.taskDate = $filter('date')(new Date(), 'MM/dd/yyyy');
        console.log(addTaskVm.newTask.taskDate);

        addTaskVm.newTask.taskPriority = "medium";
        addTaskVm.newTask.taskDescription = "sampe big taelkk";


        function priorityChanged() {
            if (addTaskVm.newTask.priorityBar > 0 && addTaskVm.newTask.priorityBar <= 35) {
                addTaskVm.newTask.taskPriority = "low";
            } else if (addTaskVm.newTask.priorityBar > 35 && addTaskVm.newTask.priorityBar <= 70) {
                addTaskVm.newTask.taskPriority = "medium";
            } else if (addTaskVm.newTask.priorityBar > 70 && addTaskVm.newTask.priorityBar <= 100) {
                addTaskVm.newTask.taskPriority = "high";
            }
        }

        function addNewTask() {
            AddTaskDataService.addNewTask(addTaskVm.newTask);
        }

    }

    /*function authenticateUser() {
            APIServices.login(loginVm.reg_num, loginVm.password).then(function(result) {
                if (result == "password_wrong") {
                    alert("Password is wrong");
                } else if (result == "no_such_reg_num") {
                    alert("No such register number")
                } else {
                    $state.go("header.dashboard");
                }
            });
        }*/

})();