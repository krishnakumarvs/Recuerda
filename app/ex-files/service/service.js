(function() {
    'use strict';

    /**
     * Get Shared module.
     */
    angular.module(appName)


    /**
     * Shared data service.
     */

    .factory('APIServices', APIServices);

    APIServices.$inject = ['$http', '$q', 'localStorageService'];

    function APIServices($http, $q, localStorageService) {
        var baseUrl = "http://localhost:8080/PLACEMENT_SERVER/resources/";
        var loginUrl = "studentLogin"; //?reg_num=234&password=cxtjb
        var faqUrl = "faq";
        var feedbackUrl = "feedback"; //?reg_num=asdasdasd&message=isisisfasfkb%20sdfjsdhfbsdf
        var interviewTipsUrl = "interviewtips";
        var changePasswordUrl = "changePassword"; //?reg_num=234&password=cxtjb&newPassword=123
        var enterBtechDetailsUrl = "addBtechDetails"; //?reg_num=123&semester=s3&percentage=79&supply=1
        var getMockExamUrl = "getMockExam";
        var getCompaniesUrl = "getCompanies"; //?reg_num=234
        var notificationUrl = "notification";
        var getStudentDetailsUrl = "getStudentDetails"; //?reg_num=234

        var studentProfile = {};
        var apiServices = {
            login: login,
            getStudentProfile: getStudentProfile,
            getCompanyDetails: getCompanyDetails,
            addAcademicDetails: addAcademicDetails,
            changePassword: changePassword,
            logoutNow: logoutNow,
            getFaq: getFaq,
            getNotification: getNotification,
            sendFeedback: sendFeedback,
            getInterviewTips: getInterviewTips,
            getUserDetails: getUserDetails,
            getMockTest: getMockTest,
            saveMockTest: saveMockTest,
            getMockTestResults: getMockTestResults
        };

        return apiServices;

        function saveMockTest(rightAnswerCount, wrongAnswerCount, total) {
            var mockTestResult = {

            };
            mockTestResult.rightAnswerCount = rightAnswerCount;
            mockTestResult.wrongAnswerCount = wrongAnswerCount;
            mockTestResult.total = total;
            mockTestResult.date = new Date();
            var localValue = localStorageService.get('mockTest') || [];
            localValue.push(mockTestResult);
            localStorageService.set('mockTest', localValue);
            console.log("Saved sucessfully");
        }

        function getMockTestResults() {
            var defer = $q.defer();
            var localValue = localStorageService.get('mockTest') || [];
            defer.resolve(localValue);
            return defer.promise;
        }

        function getMockTest() {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + getMockExamUrl
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function getUserDetails(reg_num) {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + getStudentDetailsUrl + "?reg_num=" + reg_num
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function getInterviewTips() {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + interviewTipsUrl
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function sendFeedback(reg_num, message) {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + feedbackUrl + "?reg_num=" + reg_num + "&message=" + message
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function getNotification() {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + notificationUrl
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function getFaq() {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + faqUrl
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function logoutNow() {
            var defer = $q.defer();
            localStorageService.set('studentProfile', null);
            defer.resolve(true);
            return defer.promise;
        }

        function changePassword(reg_num, oldPassword, newPassword1) {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + changePasswordUrl + "?reg_num=" + reg_num + "&password=" + oldPassword + "&newPassword=" + newPassword1
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function addAcademicDetails(reg_num, semester, percentage, supply) {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + enterBtechDetailsUrl + "?reg_num=" + reg_num + "&semester=" + semester + "&percentage=" + percentage + "&supply=" + supply
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function getCompanyDetails(reg_num) {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + getCompaniesUrl + "?reg_num=" + reg_num
            }).then(function mySucces(response) {
                if (response && response.data) {
                    defer.resolve(response.data);
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function login(reg_num, password) {
            var defer = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + loginUrl + "?reg_num=" + reg_num + "&password=" + password
            }).then(function mySucces(response) {
                console.log(response);
                if (response && response.data) {
                    defer.resolve(response.data);
                    if (response.data.name) {
                        saveStudentProfile(response.data);
                        getStudentProfile();
                    }
                } else {
                    defer.resolve(false);
                }
            }, function myError(response) {
                alert("server down");
                defer.resolve(false);
            });
            return defer.promise;
        }

        function saveStudentProfile(studentProfile) {
            localStorageService.set('studentProfile', studentProfile);
            studentProfile = angular.copy(studentProfile);
        }

        getStudentProfile();

        function getStudentProfile() {
            var defer = $q.defer();
            if (localStorageService.get('studentProfile')) {
                defer.resolve(localStorageService.get('studentProfile'));
                studentProfile = angular.copy(localStorageService.get('studentProfile'));
            } else {
                defer.resolve(false);
            }
            return defer.promise;
        }

    }

})();