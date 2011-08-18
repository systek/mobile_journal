//Bindings
var initBindings = function(){
    $("#hourreg").live("pagecreate", function(event) {
        ko.applyBindings(App.hourRegistrationModel, $("#hourreg").get(0))
    })
};

var loadData = function(){
    $.getJSON('/hourreg/avaliableprojects/', function(data) {
        $.each(data, function(key, val) {
            App.avaliableProjects.push(val.name)
        });
    });
};

$(document).ready(function() {
    initBindings();
    loadData();
});