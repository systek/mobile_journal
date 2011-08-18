
HourRegistration = function(projectName, hoursRegistered, minutesRegistered){
    this.hoursRegistered = hoursRegistered;
    this.minutesRegistered = minutesRegistered;
}

//TODO See if we can avoid singleton to make unit testing easier
App.hourRegistrationModel =  {
    avaliableProjects: App.avaliableProjects,
    name: ko.observable("TestProsject"),
    minutes: ko.observable(30),
    hours: ko.observable(7),
    date: ko.observable(new Date()),
    savedData: ko.observable(null),

    nextDay: function(){
        this.date(this.date().next().day())
        this.restoreState();

    },

    prevDay: function(){
        this.date(this.date().previous().day())
        this.restoreState();
    },

    save: function(){
        var toSave = new HourRegistration(this.name(), this.hours(), this.minutes())
        Dataaccess.saveHourRegistrationElement(this.createKey(), toSave);
        this.savedData(toSave);
    },

    restoreState: function(){
        var restoredElement = Dataaccess.locateHourRegistrationElement(this.createKey())
        if(restoredElement != null){
            this.savedData(restoredElement)
            this.hours(restoredElement.hoursRegistered)
            this.minutes(restoredElement.minutesRegistered)
        } else{
            this.hours(7);
            this.minutes(30);
            this.savedData(null);
        }
    },

    createKey: function(){
        return this.date().toString("dd-MM-yyyy-") + this.name();
    }
};

App.hourRegistrationModel.prettyDate = ko.dependentObservable(function() {
    return this.date().toString("dddd dd  MMM yy")
}, App.hourRegistrationModel);

App.hourRegistrationModel.notSaved = ko.dependentObservable(function() {
    var ret = this.savedData() == null ||
        this.hours() != this.savedData().hoursRegistered ||
        this.minutes() != this.savedData().minutesRegistered;
    return ret;
}, App.hourRegistrationModel);


