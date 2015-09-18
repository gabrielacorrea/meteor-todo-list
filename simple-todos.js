Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    Template.body.helpers({
        tasks: function () {
            if (Session.get("showPromotions")) {
                // If hide completed is checked, filter tasks
                return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
            } else {
                // Otherwise, return all of the tasks
                return Tasks.find({}, {sort: {createdAt: -1}});
            }
        },
        showPromotions: function () {
            return Session.get("showPromotions");

        }
    });

    Template.body.events({
        "submit .nova-oficina": function (event) {
            event.preventDefault();

            var taskToAdd = event.target.nomeNovaOficina.value;

            Tasks.insert({
                text: taskToAdd,
                createdAt: new Date()
            });

            event.target.nomeNovaOficina.value = "";
        },
        "click .toggle-checked": function () {
            Tasks.update(this._id, {
                $set: {checked: !this.checked}
            });
        },
        "click .delete": function () {
            Tasks.remove(this._id);
        },
        "change .show-promotions input": function (event) {
            Session.set("showPromotions", event.target.checked);
        }
    });
}