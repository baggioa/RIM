


/*funzione occhio per nascondere i checkbox non spuntati */
function showhide(event) {
  var show = event.target.classList.contains('fa-eye');
  if (show)
    event.target.classList.replace('fa-eye', 'fa-eye-slash');
  else
    event.target.classList.replace('fa-eye-slash', 'fa-eye');

  document.querySelectorAll('i.attivaConsegne.fa-square-o').forEach(function (el){
    el.parentElement.parentElement.style.display = show ? '' : 'none';
  } );
}

/*creazione testata con reparti*/
function titoli() {
  var reparti = ['Magazzino','Officina','Qualità','Produzione'];
  for (var i = 0; i < reparti.length; i++) {
    document.getElementById('testata').innerHTML += '<th>' + reparti[i] + '<i class="fa fa-minus-square-o ' + reparti[i] + '" onclick="showcolumn(event)"></i></th>';
  };
  var avanzamento1 = [{"codice":"123", "reparti":[{"reparto":"reparto Magazzino"}]},{"codice":"245", "reparti":[{"reparto":"reparto Magazzino"}]}];
  caricaAvanzamento(avanzamento1);
}

/*funzione per nascondere le colonne dei vari reparti*/
function showcolumn(event) {
  var show = event.target.classList.contains('fa-plus-square-o');
  if (show)
    event.target.classList.replace('fa-plus-square-o', 'fa-minus-square-o');
  else
    event.target.classList.replace('fa-minus-square-o', 'fa-plus-square-o');

  if (event.target.classList.contains('Magazzino'))
    document.querySelectorAll('td.Magazzino > div, td.Magazzino > input').forEach(function (el){
      el.style.display = show ? '' : 'none';
    } );
  if (event.target.classList.contains('Officina'))
    document.querySelectorAll('td.Officina > div, td.Officina > input').forEach(function (el){
      el.style.display = show ? '' : 'none';
    } );
  if (event.target.classList.contains('Qualità'))
    document.querySelectorAll('td.Qualità > div, td.Qualità > input').forEach(function (el){
      el.style.display = show ? '' : 'none';
    } );
    if (event.target.classList.contains('Produzione'))
      document.querySelectorAll('td.Produzione > div, td.Produzione > input').forEach(function (el){
        el.style.display = show ? '' : 'none';
      } );
}


/*creazione righe con checkbox*/
function createTr() {
  var codice = document.getElementById('codice').value;
  var checkbox = '<span class="icon"><i class="attivaConsegne fa fa-fw fa-square-o"></i><i class="fa fa-fw fa-square"></i></span>';
  var note = '<input type="text">';
  var magazzino = '<td class="reparto Magazzino"><div>tenere suddivisi i lotti </div><div>andare ad esaurimento </div><div>portare a lavorazione interna </div><div>portare a lavorazione esterna </div>' + note + '</td>';
  var officina = '<td class="reparto Officina"><div>lavorazione </div>' + note + '</td>';
  var qualità = '<td class="reparto Qualità"><div>disegno aggiornato </div><div>tenere suddivisi i lotti </div>' + note + '</td>';
  var produzione = '<td class="reparto Produzione"><div>andare ad esaurimento </div><div>modifica retroattiva </div><div>non compatibile con precedente </div>' + note + '</td>'

  document.getElementById('corpo').innerHTML += '<tr data-codice="' + codice + '"><td>' + codice + '</td>' + magazzino + officina + qualità + produzione + '</tr>';
  var span = 'tr[data-codice="' + codice + '"] > td > div';
  document.querySelectorAll(span).forEach(function (el) {
    el.innerHTML += checkbox
  });
}

/*funzione per il cambio di stato dei checkbox*/
function changestate(event) {
  var et = event.target;
  if (et.tagName == 'I') {
    if (et.classList.contains('fa-square-o'))
      et.classList.replace('fa-square-o', 'fa-check-square-o');
    else {
      et.classList.replace('fa-check-square-o', 'fa-square-o');
    };
    if (et.classList.contains('attivaConsegne'))
      if (et.classList.contains('fa-check-square-o'))
        et.nextElementSibling.classList.replace('fa-square', 'fa-square-o');
      if (et.classList.contains('fa-square-o')){
        et.nextElementSibling.classList.remove(['fa-square-o', 'fa-check-square-o']);
        et.nextElementSibling.classList.add('fa-square');
      }

  }
}

/*creare JSON*/
function creaJSON(){

    var articoli = document.querySelectorAll('tbody > tr');
    var codice = [];

    articoli.forEach(function (art) {
      var reparto = [];
      art.querySelectorAll('.reparto').forEach(function (rep){
        var icone2 = [];
        rep.querySelectorAll('i').forEach(function (icon){
          icone2.push({icone2: icon.getAttribute('class')})
        });
        reparto.push({reparto: rep.getAttribute('class'), icone: icone2})
      });
      codice.push({ codice: art.getAttribute('data-codice'), reparti: reparto})
    });

    log(JSON.stringify(codice));
}


function log(txt) {
    document.getElementById('log').innerHTML = txt;
}

/*carica JSON*/
function caricaAvanzamento(avanzamento) {
  var codice1;
  var checkbox1 = '<span class="icon"><i class="attivaConsegne fa fa-fw fa-square-o"></i><i class="fa fa-fw fa-square"></i></span>';
  var note1 = '<input type="text">';
  var magazzino1;
  var officina1 = '<td class="reparto Officina"><div>lavorazione </div>' + note1 + '</td>';
  var qualità1 = '<td class="reparto Qualità"><div>disegno aggiornato </div><div>tenere suddivisi i lotti </div>' + note1 + '</td>';
  var produzione1 = '<td class="reparto Produzione"><div>andare ad esaurimento </div><div>modifica retroattiva </div><div>non compatibile con precedente </div>' + note1 + '</td>'

  avanzamento.forEach(function (articolo) {
    codice1 = articolo.codice;
    articolo.reparti.forEach(function (rep){
      magazzino1 = '<td class="' + rep.reparto + '"><div>tenere suddivisi i lotti </div><div>andare ad esaurimento </div><div>portare a lavorazione interna </div><div>portare a lavorazione esterna </div>' + note1 + '</td>';
    })
    document.getElementById('corpo').innerHTML += '<tr data-codice="' + codice1 + '"><td>' + codice1 + '</td>' + magazzino1 + officina1 + qualità1 + produzione1 + '</tr>';
    var span = 'tr[data-codice="' + codice1 + '"] > td > div';
    document.querySelectorAll(span).forEach(function (el) {
      el.innerHTML += checkbox1
    });
  });

}

/*
[
 { "articolo": "1234",
 "reparti": [
   { "reparto 1": "magazzino", "checkbox": "span html" },
   { "reparto 2": "officina", "checkbox": "span html" }
 ]
 }
]


[{"codice":"123","reparti":[{"reparto":"reparto Magazzino","icone":[{"icone2":"attivaConsegne fa fa-fw fa-check-square-o"},{"icone2":"fa fa-fw fa-check-square-o"},{"icone2":"attivaConsegne fa fa-fw fa-check-square-o"},{"icone2":"fa fa-fw fa-square-o"},{"icone2":"attivaConsegne fa fa-fw fa-square-o"},{"icone2":"fa fa-fw fa-square"},{"icone2":"attivaConsegne fa fa-fw fa-square-o"},{"icone2":"fa fa-fw fa-square"}]},{"reparto":"reparto Officina","icone":[{"icone2":"attivaConsegne fa fa-fw fa-square-o"},{"icone2":"fa fa-fw fa-square"}]},{"reparto":"reparto Qualità","icone":[{"icone2":"attivaConsegne fa fa-fw fa-check-square-o"},{"icone2":"fa fa-fw fa-check-square-o"},{"icone2":"attivaConsegne fa fa-fw fa-check-square-o"},{"icone2":"fa fa-fw fa-square-o"}]},{"reparto":"reparto Produzione","icone":[{"icone2":"attivaConsegne fa fa-fw fa-check-square-o"},{"icone2":"fa fa-fw fa-square-o"},{"icone2":"attivaConsegne fa fa-fw fa-square-o"},{"icone2":"fa fa-fw fa-square"},{"icone2":"attivaConsegne fa fa-fw fa-square-o"},{"icone2":"fa fa-fw fa-square"}]}]}]
 */
