Tasks = new Mongo.Collection("tasks");

var consultaPorNome = function() {
    var nomeOficina = event.target.nomePesquisaOficina;
    console.log("B pesquisa: " + event.target.nomePesquisaOficina);
    return Tasks.find({text: "nova"});
}

if (Meteor.isClient) {
    Template.body.helpers({
        tasks: function () {
            console.log("A pesquisa: " + event.target.nomePesquisaOficina);
            if (typeof event.target.nomePesquisaOficina != 'undefined') {
                return consultaPorNome();
            } else {
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
        "submit .consulta": function (event) {
            event.preventDefault();
            console.log("C rodou");

            consultaPorNome();
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