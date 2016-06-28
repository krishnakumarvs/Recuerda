var appName = "Recuerda";
// Ionic Starter App


angular.module(appName, ['ionic', 'LocalStorageModule'])

.run(function($ionicPlatform, $rootScope, $state) {
    $rootScope.$state = $state;

    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$stateChangeStart', function(e, curr, prev) {

        //console.log(curr.title);
        $rootScope.pageTitle = curr.title;
    });
    $rootScope.$on('$stateChangeSuccess', function(e, curr, prev) {
        $rootScope.currentState = $state.current;

    });
})

.config(function($stateProvider, $urlRouterProvider) {
    //fallback language if entry is not found in current language
    /*$translateProvider.fallbackLanguage('es');*/
    //load language entries from files
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js


    $stateProvider

    // setup an abstract state for the tabs directive

    .state('header', {
        url: "/",
        templateUrl: "app/shared/templates/header.html",
        controller: 'HeaderController as Header',
        title: 'Header'
    })

    .state('login', {
        url: "/login",
        templateUrl: "app/login/templates/login.html",
        controller: 'LoginController as Login',
        title: 'Login'
    })

    .state('header.logs', {
        url: "logs",
        parent: 'header',
        showHeader: true,
        title: 'Logs',
         views: {
            'menuContent': {
            templateUrl: "app/logs/templates/logs.html",
            controller: 'LogsController as Logs'
        }
    }
             

        
    })

    .state('header.tasks', {
        url: "tasks",
        title: 'Tasks',
        views: {
            'menuContent': {
                templateUrl: "app/tasks/templates/tasks.html",
                controller: 'TasksController as Tasks'
            }
        }
    })

    .state('header.addtask', {
        url: "addtask",
        parent: 'header',
        showHeader: true,
         title: 'AddTask',
          views: {
            'menuContent': {
          templateUrl: "app/addtask/templates/addtask.html",
            controller: 'AddtaskController as Addtask'
    }
}
       
    })

    .state('header.addreminder', {
        url: "/addreminder",
        parent: 'header',
        showHeader: true,
         title: 'Addreminder',
          views: {
            'menuContent': {
        templateUrl: "app/addreminder/templates/addreminder.html",
        controller: 'AddreminderController as Addreminder'
    }
}
       
    })


    .state('header.registration', {
        url: "registration",
        parent: 'header',
        showHeader: true,
         title: 'Registration',
          views: {
            'menuContent': {
        templateUrl: "app/registration/templates/registration.html",
        controller: 'RegistrationController as Registration'
    }
}
       
    })

    .state('header.settings', {
        url: "settings",
        parent: 'header',
        showHeader: true,
         title: 'Settings',
          views: {
            'menuContent': {
        templateUrl: "app/settings/templates/settings.html",
        controller: 'SettingsController as Settings'
    }
}
       
    })
        .state('header.reminder', {
            url: "reminder",
            parent: 'header',
            showHeader: true,
            title: 'Reminder',
             views: {
            'menuContent': {
            templateUrl: "app/reminder/templates/reminder.html",
            controller: 'RemiderController as Reminder'
        }
    }
            
    })

        .state('header.profile', {
        url: "profile",
        title: 'Profile',
        parent: 'header',
        showHeader: true,
        views: {
            'menuContent': {
                templateUrl: "app/profile/templates/profile.html",
                controller: 'ProfileController as Profile'
            }
        }
    });

    //mockResult

    /*.state('header.dashboard', {
        url: "dashboard",
        title: 'DashBoard',
        parent: 'header',
        showHeader: true,
        views: {
            'menuContent': {
                templateUrl: "app/templates/dashboard.html",
                controller: 'HomePageController as HomePage'
            }
        }
    })*/

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});