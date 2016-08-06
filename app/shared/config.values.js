(function() {

    var uiMessages = {
        registerationSuccess: "Successfully registered. Please login.",
        registerationFailed: "Could register, please try after some time",
        incorrectPassword: "Password do not match"
    };

    var localStorageKeys = {
        userDetails: "userDetails",
        taskDetails: "taskDetails",
        reminderDetails: "reminderDetails"
    };

    var priority = {
        high: "high",
        medium: "medium",
        low: "low"
    };

    var generalStatus = {
        created: 0,
        completed: 1,
        deleted: 2
    };

    var firebaseKeys = {
        reminder: "reminder",
        task: "task"
    };

    var config = {
        uiMessages: uiMessages,
        localStorageKeys: localStorageKeys,
        firebaseKeys: firebaseKeys,
        priority: priority,
        generalStatus: generalStatus
    };

    angular.module(appName).value('config', config);
})()