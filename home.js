Tasks = new Mongo.Collection("tasks");
Oficinas = new Mongo.Collection("oficinas");

if (Meteor.isClient) {

    Session.setDefault("isSearching", false);

    var isSearchingAsVerda = function () {
        if (!Session.get("isSearching")) {
            return Oficinas.find({}, {sort: {createdAt: -1}});
        } else {
            var nomePesquisaOficina = event.target.nomePesquisaOficina.value;
            return Oficinas.find({nome: nomePesquisaOficina}).fetch()
        }
        return Session.get("isSearching");
    };

    Template.body.helpers({
        oficinasListAsVerda: function () {
            return isSearchingAsVerda();
        }
    });

    Template.body.events({
        "submit .consulta": function (event) {
            event.preventDefault();
            Session.set("isSearching", true);
        }
    });

    Template.formPesquisa.events ({
        "submit .nova-oficina": function (event) {
            event.preventDefault();

            var nomeNovaOficina = event.target.nomeNovaOficina.value;
            var enderecoNovaOficina = event.target.enderecoNovaOficina.value;

            Oficinas.insert({
                nome: nomeNovaOficina,
                endereco: enderecoNovaOficina
            });

            event.target.nomeNovaOficina.value = "";
            event.target.enderecoNovaOficina.value = "";
        }
    });
}