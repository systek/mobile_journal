//Bindings
(function initBindings(){
    $("#hourreg").live("pagecreate", function(event) {
        ko.applyBindings(App.hourRegistrationModel, $("#hourreg").get(0))
    })
})();