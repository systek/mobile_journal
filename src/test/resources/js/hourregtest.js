Dataaccess = {

    saveHourRegistrationElement: function(key, object) {
        Dataaccess.lastSaved = object;
    },

    locateHourRegistrationElement: function(key) {
        return Dataaccess.lastSaved;
    }
}


test('should save when save is pressed', function() {
    var model = App.hourRegistrationModel;
    model.hours(8);
    ok(model.notSaved(), 'Data has not been saved')
    ok(Dataaccess.lastSaved == null, 'Data has not been saved')
    model.save();
    ok(Dataaccess.lastSaved != null, 'Data has been saved')
    ok(Dataaccess.lastSaved.hoursRegistered === 8, 'Correct number of hours is saved')
    ok(!model.notSaved(), 'Data has been marked as saved')
})

test('should make as saved when changing to a day where we have saved data', function() {
    var model = App.hourRegistrationModel;
    ok(!model.notSaved(), 'Data is marked as saved')
    //Returing nothing
    Dataaccess.lastSaved = null;
    model.nextDay()
    ok(model.notSaved(), 'Data is marked as not saved')
    Dataaccess.lastSaved = new HourRegistration("TestProsject", 10, 0)
    model.nextDay()
    ok(!model.notSaved(), 'Data is marked as saved')
    same(model.hours(), 10, 'Hours is restored from saved')
    same(model.minutes(), 0, 'Minutes is restored from saved')
})
