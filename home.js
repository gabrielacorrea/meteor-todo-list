Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

    Session.setDefault("isSearching", false);

    var isSearching = function () {
        if (!Session.get("isSearching")) {
            return Tasks.find({}, {sort: {createdAt: -1}});
        } else {
            var nomePesquisaOficina = event.target.nomePesquisaOficina.value;
            return Tasks.find({text: nomePesquisaOficina}).fetch()
        }
        return Session.get("isSearching");
    };

    Template.body.helpers({
        oficinasList: function () {
            return isSearching();
        }
    });

    Template.body.events({
        "submit .consulta": function (event) {
            event.preventDefault();
            Session.set("isSearching", true);
        },

        "click .delete": function () {
            Tasks.remove(this._id);
        }
    });

    Template.formPesquisa.events ({
        "submit .nova-oficina": function (event) {
            event.preventDefault();

            var taskToAdd = event.target.nomeNovaOficina.value;

            Tasks.insert({
                text: taskToAdd,
                createdAt: new Date()
            });

            event.target.nomeNovaOficina.value = "";
        },
    });
}