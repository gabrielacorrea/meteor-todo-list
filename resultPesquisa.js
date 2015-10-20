Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    Template.resultPesquisa.helpers({
        tasks: function () {
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.body.events({
        "click .delete": function () {
            Tasks.remove(this._id);
        },

        "change .show-promotions input": function (event) {
            Session.set("showPromotions", event.target.checked);
        }
    });
}

var consultaPorNome = function () {
    var nomeOficina = event.target.nomePesquisaOficina.value;
    return Tasks.find({text: nomeOficina}).fetch();
}