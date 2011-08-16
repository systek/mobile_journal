Dataaccess ={

    saveHourRegistrationElement: function(key, object) {
        localStorage.setItem(key, ko.toJSON(object));
    },

    locateHourRegistrationElement: function(key){
        var object = localStorage.getItem(key);
        return object != null && object != undefined ?
             JSON.parse(object) : null;
    }
}