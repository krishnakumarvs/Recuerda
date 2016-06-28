(function() {
    'use strict';

    /**
     * Get the main module (shared for Workout).
     */
    angular.module(appName)
    /**
     * Task Controller.
     */
    .controller('TasksController', Task);

    Task.$inject = ['$state'];
    
    function Task($state) {
        var loginVm = this;
        alert(1);
    }

})();