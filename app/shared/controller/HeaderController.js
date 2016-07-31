(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Header Controller.
     */
    .controller('HeaderController', Header);

    Header.$inject = ['$state'];

    function Header($state) {
        var headerVm = this;
        console.log("started header");
        headerVm.goToPage = goToPage;

        function goToPage(pageNo) {
            switch (pageNo) {
                case 1:
                    $state.go('header.tasks')
                    break;
                case 2:
                    $state.go('header.reminder')
                    break;

                case 3:
                    $state.go('header.profile')
                    break;
                case 4:
                    $state.go('header.settings')
                    break;
                case 5:
                    $state.go('header.logs')
                    break;
                case 6:
                    $state.go('login')
                    break;

                default:
                    $state.go('header.tasks')

            }

        }

    }

})();