(function() {

    var uiMessages = {
        registerationSuccess: "Successfully registered. Please login.",
        registerationFailed: "Could register, please try after some time",
        incorrectPassword: "Password do not match"
    };

    var localStorageKeys = {
        userDetails: "userDetails"
    };

    var firebaseKeys = {
        reminder: "reminder",
        task: "task"
    };

    var config = {
        uiMessages: uiMessages,
        localStorageKeys: localStorageKeys,
        firebaseKeys: firebaseKeys
    };

    angular.module(appName).value('config', config);
})()