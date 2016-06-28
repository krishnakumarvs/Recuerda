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

       
        var tasks=[
    {
        name:"Buy apple",
        date:"today "
    
    },
   
    {
        name:"book flight tckt",
        date:"today evening"
    },
     {
        name:"Get job",
        date:"tomorrow"
    
    
    },
     {
        name:"Marriage function",
        date:"last sunday"
    
    },
    {
        name:"Class meeting",
        date:"6.07.2016"
    
    }
    ];
     tasksVm.tasks=tasks;
        
        /*loginVm.reg_num = "234";
        loginVm.password = "123"

        loginVm.authenticateUser = authenticateUser;
        activate();*/

        /*function activate() {
            APIServices.getStudentProfile().then(function(response) {
                console.log(response);
                if (response) {
                    $state.go("header.dashboard");
                }
            });
        }*/

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
    }

})();