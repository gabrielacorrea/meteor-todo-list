Router.map(function() {
    this.route('pesquisaOficina', {path: '/pesquisa/'});
//    this.route('home', {path: '/home'});
    this.route('pag1', {path: '/pag1'});

});

Router.route('home', function () {
  this.render('home');
});