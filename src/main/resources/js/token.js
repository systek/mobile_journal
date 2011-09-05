App.tokenLoader = {
    key: ko.observable(),
    updateToken: function() {
        //TODO: Error handling!!!!
        $.ajax({
            url: App.baseUrl + '/token?key=' + this.key(),
            dataType: 'json',
            data: null,
            success: function(data) {
                App.security.token = data;
                App.security.storetoken(data);
                App.tokenLoader.tokenUpdatedCallback();
            }
        });
    },
    tokenUpdatedCallback: function(){}
}

App.security = {};

App.security.storetoken = function(token) {
    localStorage.setItem("token", token);
}

App.security.hasToken = function() {
    App.security.token = localStorage.getItem("token");
    return App.security.token != null;
}

App.security.getTokenParam = function() {
    return "usertoken=" + encodeURIComponent(App.security.token);
}