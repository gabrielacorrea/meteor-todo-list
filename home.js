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

            var oficinas = consultaPorNome();

            console.log("oficinas: " + oficinas.text);
            Session.set('tasks', oficinas[0].text);
        },

        "click .toggle-checked": function () {
            Tasks.update(this._id, {
                $set: {checked: !this.checked}
            });
        },

        "click .delete": function () {
            Tasks.remove(this._id);
        }
    });
}

var consultaPorNome = function () {
    var nomeOficina = event.target.nomePesquisaOficina.value;
    return Tasks.find({text: nomeOficina}).fetch();
}