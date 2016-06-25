angular.module('ionicDatePicker', [])

.directive('ionicDatePicker', function($ionicPopup, $rootScope, $ionicModal, SharedService) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            ipDate: '=idate'
        },
        link: function(scope, element, attrs) {
            var monthsList = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ];
            var globalDateChangeStates = ['header.dashboard', 'consumes', 'burns', 'meal-plan', 'exercise-plan'];
            var noOfMonthsAllowed = 1;
            var myPopUp;
            var today = new Date();
            var temp = today;
            var kk = temp.setMonth(today.getMonth() - 1);
            var currentDate = angular.copy(scope.ipDate);
            var globalDateChange = (globalDateChangeStates.indexOf($rootScope.currentState.name) === -1) ? false : true;
            if (!globalDateChange) {
                currentDate = new Date();
            }
            var selectedDate = SharedService.getSelectedDay();
            selectedDate.setHours(0, 0, 0, 0);
            var dateEx = {
                dateString: selectedDate.toString()
            }

            $rootScope.$on('changeDateInDatePicker', function(event) {
                var selectedDate = SharedService.getSelectedDay();
                selectedDate.setHours(0, 0, 0, 0);
                var dateEx = {
                    dateString: selectedDate.toString()
                }
                selectDefaultDate(dateEx);
            });

            scope.date_selection = {
                selected: false,
                selectedDate: '',
                submitted: false
            };
            selectDefaultDate(dateEx);

            scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            var refreshDateList = function(current_date) {

                if (!current_date) {
                    current_date = new Date();
                }
                var firstDay = new Date(current_date.getFullYear(), current_date.getMonth(), 1).getDate();
                var lastDay = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();

                scope.dayList = [];

                for (var i = firstDay; i <= lastDay; i++) {
                    var tempDate = new Date(current_date.getFullYear(), current_date.getMonth(), i);
                    scope.dayList.push({
                        date: tempDate.getDate(),
                        month: tempDate.getMonth(),
                        year: tempDate.getFullYear(),
                        day: tempDate.getDay(),
                        dateString: tempDate.toString(),
                        epochLocal: tempDate.getTime(),
                        epochUTC: (tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000))
                    });
                }

                var firstDay = scope.dayList[0].day;

                for (var j = 0; j < firstDay; j++) {
                    scope.dayList.unshift({});
                }

                scope.rows = [];
                scope.cols = [];

                scope.currentMonth = monthsList[current_date.getMonth()];
                scope.currentYear = current_date.getFullYear();

                scope.numColumns = 7;
                scope.rows.length = 6;
                scope.cols.length = scope.numColumns;
            };

            scope.prevMonth = function() {
                var uio = new Date(kk);
                if ((uio.getMonth() - currentDate.getMonth() + 1) < noOfMonthsAllowed || !globalDateChange) {
                    if (currentDate.getMonth() === 1) {
                        currentDate.setFullYear(currentDate.getFullYear());
                    }
                    currentDate.setMonth(currentDate.getMonth() - 1);

                    scope.currentMonth = monthsList[currentDate.getMonth()];
                    scope.currentYear = currentDate.getFullYear();

                    refreshDateList(currentDate)
                }
            };

            scope.$on('$destroy', function() {
                try {
                    scope.closeCalender();
                } catch (NoCalenderOpenedError) {}
            });

            scope.nextMonth = function() {
                var uio = new Date(kk);
                /*console.log("Last month to be allowed : " + uio.getMonth());
                console.log("Trying to go to month no : " + currentDate.getMonth());
                console.log((uio.getMonth() - currentDate.getMonth() + 1) > 0)*/
                if ((uio.getMonth() - currentDate.getMonth() + 1) > 0 || !globalDateChange) {
                    if (currentDate.getMonth() === 11) {
                        currentDate.setFullYear(currentDate.getFullYear());
                    }
                    currentDate.setMonth(currentDate.getMonth() + 1);

                    scope.currentMonth = monthsList[currentDate.getMonth()];
                    scope.currentYear = currentDate.getFullYear();
                    refreshDateList(currentDate)
                }
            };

            scope.closeCalender = function() {
                myPopUp.hide();
            };

            function selectDefaultDate(date) {
                scope.selctedDateString = date.dateString;
                scope.date_selection.selected = true;
                scope.date_selection.selectedDate = new Date(date.dateString);
            }

            function isFutureDate(date) {
                var isFutureDate = false;
                date = new Date(date.dateString);
                var now = new Date();
                if (date > now) {
                    isFutureDate = true;
                }
                return isFutureDate;
            }

            scope.dateSelected = function(date) {
                if (!isFutureDate(date)) {
                    scope.selctedDateString = date.dateString;
                    scope.date_selection.selected = true;
                    scope.date_selection.selectedDate = new Date(date.dateString);
                    scope.date_selection.submitted = true;
                    if (scope.date_selection.selected === true) {
                        scope.ipDate = angular.copy(scope.date_selection.selectedDate);
                        if (globalDateChange) {
                            scope.$emit('dateChanged', scope.date_selection.selectedDate);
                            $rootScope.$broadcast('weeklyControllerDateChange');
                        }
                        if ($rootScope.currentState.name == 'monthly-history') {
                            scope.$emit('filterDateSelected');
                        }
                        scope.closeCalender();
                    } else {
                        e.preventDefault();
                    }
                }
            };

            element.on("click", function() {
                refreshDateList(angular.copy(scope.ipDate));

                $ionicModal.fromTemplateUrl('lib/ionic-datepicker/template/date-picker-modal.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    myPopUp = modal;
                    modal.show();
                });

                /*myPopUp = $ionicPopup.show({
                    templateUrl: "lib/ionic-datepicker/template/date-picker-modal.html",
                    title: '<strong>Select Date</strong>',
                    subTitle: '',
                    scope: scope
                });*/
            })
        }
    }
});