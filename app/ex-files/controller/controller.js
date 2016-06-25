(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Login Controller.
     */
    .controller('LoginController', Login)

    .controller('HomePageController', HomePage)

    .controller('ProfileController', Profile)

    .controller('AcadamicDetailsController', AcadamicDetails)

    .controller('ChangePasswordController', ChangePassword)

    .controller('InterviewTipsController', InterviewTips)

    .controller('MockTestController', MockTest)

    .controller('MockResultController', MockResult)

    .controller('FaqController', Faq)

    .controller('FeedBackController', FeedBack)

    .controller('NotificationController', Notification)

    .controller('LogoutController', Logout);

    Login.$inject = ['$state', 'APIServices'];

    function Login($state, APIServices) {
        var loginVm = this;
        loginVm.reg_num = "234";
        loginVm.password = "123"

        loginVm.authenticateUser = authenticateUser;
        activate();

        function activate() {
            APIServices.getStudentProfile().then(function(response) {
                console.log(response);
                if (response) {
                    $state.go("header.dashboard");
                }
            });
        }

        function authenticateUser() {
            APIServices.login(loginVm.reg_num, loginVm.password).then(function(result) {
                if (result == "password_wrong") {
                    alert("Password is wrong");
                } else if (result == "no_such_reg_num") {
                    alert("No such register number")
                } else {
                    $state.go("header.dashboard");
                }
            });
        }
    }

    HomePage.$inject = ['$state', 'APIServices'];

    function HomePage($state, APIServices) {
        var homePageVm = this;
        homePageVm.companiesFound = false;
        APIServices.getStudentProfile().then(function(response) {
            if (!response) {
                $state.go("login");
            } else {
                var reg_num = response.register_no;
                APIServices.getCompanyDetails(reg_num).then(function(response) {
                    console.log(response);
                    if (response == "no_companies") {

                    } else {
                        homePageVm.companiesFound = true;
                        homePageVm.companies = response;
                    }
                });
            }
        });
    }

    AcadamicDetails.$inject = ['$state', 'APIServices'];

    function AcadamicDetails($state, APIServices) {
        var acadamicDetailsVm = this;
        acadamicDetailsVm.semester = "S1S2";
        acadamicDetailsVm.addAcademicDetails = addAcademicDetails;

        function addAcademicDetails(argument) {
            APIServices.getStudentProfile().then(function(response) {
                console.log(response);
                if (!response) {
                    $state.go("login");
                } else {
                    var reg_num = response.register_no;
                    APIServices.addAcademicDetails(reg_num, acadamicDetailsVm.semester, acadamicDetailsVm.percentage, acadamicDetailsVm.supply).then(function(response) {
                        console.log(response);
                        if (response == "success") {
                            alert("Successfully added!");
                            $state.go("header.dashboard");
                        } else if (response == "enter_proper_supply" || response == "enter_proper_percentage") {
                            alert("Enter all the feilds properly");
                        }
                    });
                }
            });
        }
    }

    ChangePassword.$inject = ['$state', 'APIServices'];

    function ChangePassword($state, APIServices) {
        var changePasswordVm = this;
        changePasswordVm.changePassword = changePassword;

        function changePassword() {
            APIServices.getStudentProfile().then(function(response) {
                console.log(response);
                if (!response) {
                    $state.go("login");
                } else {
                    console.log(changePasswordVm.newPassword1);
                    if (!changePasswordVm.newPassword1 || changePasswordVm.newPassword1 == "" || !changePasswordVm.newPassword2 || changePasswordVm.newPassword2 == "" || changePasswordVm.newPassword1 == "" || changePasswordVm.oldPassword == "") {
                        alert("Enter all the feilds");
                    } else if (changePasswordVm.newPassword1 == changePasswordVm.newPassword2) {
                        var reg_num = response.register_no;
                        APIServices.changePassword(reg_num, changePasswordVm.oldPassword, changePasswordVm.newPassword1).then(function(response) {
                            console.log(response);
                            if (response == "success") {
                                alert("Successfully change password");
                                $state.go("header.dashboard");
                            }
                        });
                    } else {
                        alert("Enter same passwords");
                    }
                }
            });
        }

    }

    InterviewTips.$inject = ['$state', 'APIServices'];

    function InterviewTips($state, APIServices) {
        var interviewTipsVm = this;
        APIServices.getStudentProfile().then(function(response) {
            if (!response) {
                $state.go("login");
            } else {
                APIServices.getInterviewTips().then(function(response) {
                    console.log(response);
                    interviewTipsVm.interviewTips = response;
                });
            }
        });
    }

    MockTest.$inject = ['$state', 'APIServices'];

    function MockTest($state, APIServices) {
        var mockTestVm = this;
        mockTestVm.examTime = 10 * 60 * 1000;
        mockTestVm.examStarted = false;


        mockTestVm.startExam = startExam;
        mockTestVm.finishExam = finishExam;
        mockTestVm.selectAnswer = selectAnswer;
        mockTestVm.goHome = goHome;

        function goHome() {
            $state.go("header.dashboard");
        }

        function selectAnswer(question, optionNumber, selectedAnswer) {
            console.log(selectedAnswer);
            console.log(question);
            //mockTestVm.examQuestions
            angular.forEach(mockTestVm.examQuestions, function(eachQuestion, key) {
                if (eachQuestion.id == question.id) {
                    console.log("found");
                    var i;
                    mockTestVm.examQuestions[key].selectedAnswer = "";
                    for (i = 1; i < 5; i++) {
                        if (i != optionNumber) {
                            mockTestVm.examQuestions[key]["option" + i + "Selected"] = false;
                        } else {
                            mockTestVm.examQuestions[key]["option" + i + "Selected"] = !mockTestVm.examQuestions[key]["option" + i + "Selected"];
                        }
                    }
                    console.log(optionNumber + " is " + mockTestVm.examQuestions[key]["option" + optionNumber + "Selected"])
                    if (mockTestVm.examQuestions[key]["option" + optionNumber + "Selected"]) {
                        mockTestVm.examQuestions[key].selectedAnswer = selectedAnswer;
                    }
                }
            });
        }

        function finishExam() {
            mockTestVm.showscorecard = true;

            var rightAnswerCount = 0;
            var wrongAnswerCount = 0;
            angular.forEach(mockTestVm.examQuestions, function(eachQuestion, key) {
                console.log(eachQuestion);
                if (eachQuestion.selectedAnswer && eachQuestion.selectedAnswer != "") {
                    // if empty the answer is not attended
                    if (eachQuestion.selectedAnswer == eachQuestion.answer) {
                        rightAnswerCount++;
                    } else {
                        wrongAnswerCount++;
                    }
                }
            });
            console.log("rightAnswerCount " + rightAnswerCount);
            console.log("wrongAnswerCount " + wrongAnswerCount);
            mockTestVm.rightAnswerCount = rightAnswerCount;
            mockTestVm.wrongAnswerCount = wrongAnswerCount;

            var total = (rightAnswerCount * 4) - wrongAnswerCount;
            mockTestVm.totalMark = total;


            APIServices.saveMockTest(rightAnswerCount, wrongAnswerCount, total);


        }

        function startExam() {
            mockTestVm.examStarted = true;
        }

        APIServices.getStudentProfile().then(function(response) {
            if (!response) {
                $state.go("login");
            } else {
                var reg_num = response.register_no;

                APIServices.getMockTest().then(function(response) {
                    console.log(response);
                    mockTestVm.examQuestions = response;
                });
            }
        });
    }

    Profile.$inject = ['$state', 'APIServices'];

    function Profile($state, APIServices) {
        var profileVm = this;
        APIServices.getStudentProfile().then(function(response) {
            if (!response) {
                $state.go("login");
            } else {
                var reg_num = response.register_no;
                APIServices.getUserDetails(reg_num).then(function(response) {
                    console.log(response);
                    profileVm.userDetails = response;
                });
            }
        });
    }

    MockResult.$inject = ['$state', 'APIServices'];

    function MockResult($state, APIServices) {
        var mockResultVm = this;
        APIServices.getMockTestResults().then(function(response) {
            console.log(response);
            mockResultVm.mockResults = response;
        });
    }

    Faq.$inject = ['$state', 'APIServices'];

    function Faq($state, APIServices) {
        var faqeVm = this;
        APIServices.getStudentProfile().then(function(response) {
            if (!response) {
                $state.go("login");
            } else {
                APIServices.getFaq().then(function(response) {
                    console.log(response);
                    faqeVm.faq = response;
                });
            }
        });
    }

    FeedBack.$inject = ['$state', 'APIServices'];

    function FeedBack($state, APIServices) {
        var feedBackVm = this;
        feedBackVm.sendFeedBack = sendFeedBack;

        function sendFeedBack() {
            APIServices.getStudentProfile().then(function(response) {
                if (!response) {
                    $state.go("login");
                } else {
                    var reg_num = response.register_no;
                    APIServices.sendFeedback(reg_num, feedBackVm.message).then(function(response) {
                        console.log(response);
                        if (response == "success") {
                            alert("Successfully send feedback");
                            $state.go("header.dashboard");
                        }
                    });
                }
            });
        }
    }

    Notification.$inject = ['$state', 'APIServices'];

    function Notification($state, APIServices) {
        var notificationVm = this;
        APIServices.getStudentProfile().then(function(response) {
            if (!response) {
                $state.go("login");
            } else {
                APIServices.getNotification().then(function(response) {
                    console.log(response);
                    notificationVm.notifications = response;
                });
            }
        });
    }

    Logout.$inject = ['$state', 'APIServices'];

    function Logout($state, APIServices) {
        var logoutVm = this;
        logoutVm.logoutNow = logoutNow;

        function logoutNow() {
            console.log("Logging out");
            APIServices.logoutNow().then(function(response) {
                $state.go("login");
            });
        }
    }

})();