(function() {

    var uiMessages = {
        registerationSuccess: "Successfully registered. Please login.",
        registerationFailed: "Could register, please try after some time",
        incorrectPassword: "Password do not match"
    };

    var config = {
        uiMessages: uiMessages
    };

    angular.module(appName).value('config', config);
})()