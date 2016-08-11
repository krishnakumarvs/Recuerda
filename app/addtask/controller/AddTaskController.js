(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Add Task Controller.
     */
    .controller('AddtaskController', Addtask);

    Addtask.$inject = ['$state', '$filter', 'AddTaskDataService', 'ionicDatePicker', 'config'];

    function Addtask($state, $filter, AddTaskDataService, ionicDatePicker, config) {
        var addTaskVm = this;

        addTaskVm.priorityChanged = priorityChanged;
        addTaskVm.addNewTask = addNewTask;
        addTaskVm.openDatePicker = openDatePicker;
        activate();

        function activate() {
            addTaskVm.newTask = {}
            addTaskVm.newTask.taskName = "";
            addTaskVm.newTask.taskDate = $filter('date')(new Date(), config.dateFormat.dateFormat);
            addTaskVm.newTask.taskDateMilli = new Date().getTime();
            addTaskVm.newTask.taskPriority = config.priority.medium;
            addTaskVm.newTask.priorityBar = 50;
            addTaskVm.newTask.taskDescription = "";
            addTaskVm.newTask.status = config.generalStatus.created;
        }

        var datepickerConfig = {
            callback: function(val) { //Mandatory
                /*console.log('Return value from the datepicker popup is : ' + val, new Date(val));*/
                console.log(val);
                addTaskVm.newTask.taskDateMilli=val;
                addTaskVm.newTask.taskDate = $filter('date')(new Date(val), config.dateFormat.dateFormat);

            },
            disabledDates: [ //Optional
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2012, 1, 1), //Optional
            to: new Date(2016, 10, 30), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: true, //Optional
            disableWeekdays: [0], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup' //Optional
        };


        function priorityChanged() {
            if (addTaskVm.newTask.priorityBar > 0 && addTaskVm.newTask.priorityBar <= 35) {
                addTaskVm.newTask.taskPriority = config.priority.low;
            } else if (addTaskVm.newTask.priorityBar > 35 && addTaskVm.newTask.priorityBar <= 70) {
                addTaskVm.newTask.taskPriority = config.priority.medium;
            } else if (addTaskVm.newTask.priorityBar > 70 && addTaskVm.newTask.priorityBar <= 100) {
                addTaskVm.newTask.taskPriority = config.priority.high;
            }
        }

        function addNewTask() {
            if (addTaskVm.newTask.taskName != "" && addTaskVm.newTask.taskDate != "" && addTaskVm.newTask.taskDescription != "") {
                //AddTaskDataService.addNewTask(addTaskVm.newTask);
                AddTaskDataService.addNewTask(addTaskVm.newTask).then(function() {
                    // task added sucess, go to task view page
                    $state.go('header.tasks');
                }).catch(function() {
                    // could add, do something else
                });
            } else {
                alert(config.showMessage.enterDetails);
            }
        }

        function openDatePicker() {
            ionicDatePicker.openDatePicker(datepickerConfig);
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