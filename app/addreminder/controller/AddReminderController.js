(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
        /**
         * AddReminder Controller.
         */
        .controller('AddReminderController', AddReminder);

    AddReminder.$inject = ['$state', '$filter', 'AddReminderDataService', 'ionicDatePicker','config'];

    function AddReminder($state, $filter, AddReminderDataService, ionicDatePicker,config) {
        var addReminderVm = this;

        addReminderVm.priorityChanged = priorityChanged;
        addReminderVm.addNewReminder = addNewReminder;
        addReminderVm.openDatePicker = openDatePicker;
        activate();

        function activate() {
            addReminderVm.newReminder = {}
            addReminderVm.newReminder.reminderName = "";
            addReminderVm.newReminder.reminderDate = $filter('date')(new Date(), config.dateFormat.dateFormat);
            addReminderVm.newReminder.reminderDateMilli = new Date().getTime();
            addReminderVm.newReminder.priorityBar = 50;
            addReminderVm.newReminder.reminderPriority = config.priority.medium;
            addReminderVm.newReminder.reminderDescription = "";
            addReminderVm.newReminder.status=config.generalStatus.created;

        }
        var datepickerConfig = {
            callback: function(val) { //Mandatory
                /*console.log('Return value from the datepicker popup is : ' + val, new Date(val));*/
                addReminderVm.newReminder.reminderDateMilli=val;
                addReminderVm.newReminder.reminderDate = $filter('date')(new Date(val), config.dateFormat.dateFormat);
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
            if (addReminderVm.newReminder.priorityBar > 0 && addReminderVm.newReminder.priorityBar <= 35) {
                addReminderVm.newReminder.reminderPriority = config.priority.low;
            } else if (addReminderVm.newReminder.priorityBar > 35 && addReminderVm.newReminder.priorityBar <= 70) {
                addReminderVm.newReminder.reminderPriority = config.priority.medium;
            } else if (addReminderVm.newReminder.priorityBar > 70 && addReminderVm.newReminder.priorityBar <= 100) {
                addReminderVm.newReminder.reminderPriority = config.priority.high;
            }
        }

        function addNewReminder() {
            if (addReminderVm.newReminder.reminderName != "" && addReminderVm.newReminder.reminderDate != "" && addReminderVm.newReminder.reminderDescription != "") {
                AddReminderDataService.addNewReminder(addReminderVm.newReminder).then(function() {
                    $state.go('header.reminder');
                }).catch(function() {

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