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
    }

})();