//Bindings
var initBindings = function(){
    $("#hourreg").live("pagecreate", function(event) {
        ko.applyBindings(App.hourRegistrationModel, $("#hourreg").get(0))
    });
    $("#settings").live("pagecreate", function(event) {
        ko.applyBindings(App.tokenLoader, $("#tokenloader").get(0))
    });
};

var loadData = function(){
    $.getJSON(App.baseUrl + "/avaliableactivities?" + App.security.getTokenParam(), function(data) {
        $.each(data, function(val) {
            App.avaliableProjects.push(this.projectname + " " + this.activityname)
        });
    });
};

var loadToken = function(){
    $.mobile.changePage( "settings.html", {
        reverse: false,
        changeHash: false
    });
};

var showStartPage = function(){
    $.mobile.changePage($("#startpage"), {
        changeHash: false,
        reverse: false
    });
}

$(document).ready(function() {
    initBindings();
    if(App.security.hasToken()){
        setTimeout("showStartPage()", 2000);
        loadData();
    }
    else{
        setTimeout("loadToken()", 2000);
    }

    App.tokenLoader.tokenUpdatedCallback = function(){
        showStartPage();
    }

    $(document).ajaxError(function(xhr, message, err){
        alert("Error communicating with server: " + message);
    });
});