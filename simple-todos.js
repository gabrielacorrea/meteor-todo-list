Router.route('/pesquisaOficinas');

Tasks = new Mongo.Collection("tasks");

var consultaPorNome = function () {
    var nomeOficina = event.target.nomePesquisaOficina.value;
    return Tasks.find({text: nomeOficina}).fetch();
}

if (Meteor.isClient) {
    Template.body.helpers({
        tasks: function () {
            return Tasks.find({}, {sort: {createdAt: -1}});
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

            var txtNomeOficina = event.target.nomePesquisaOficina.value;
            var oo = consultaPorNome();

            console.log(oo);
            Session.set('pesquisaOficina', oo);
            var x = Session.get('pesquisaOficina');
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