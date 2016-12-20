console.log("loaded");

$(document).ready(function() {

  $('.reset').on('click', function(){
      grid.currentplayer = ""
      grid.resetgrid();
      $('.space').empty();
      $('.space').attr("blank", 'true');
      $('.player').css({'opacity' : '0.2'});
  });



  $('.player').on('click', function(){
    if ($(this).attr('id')==='cato') {
      grid.currentplayer = 'cato';
    } else if ($(this).attr('id')==='dogx') {
      grid.currentplayer = 'dogx';
    }
    $(this).css({'opacity' : '1'} )
  });


var updateTurn = function(elem, symbol){

  var side = "img/" + symbol + ".jpg";
  var pos = $(elem).data('pos');
  $(elem).html('<img src='+side+'>')
  $(elem).attr('blank', 'false');
  grid.makenewgrid('i' + symbol.toLowerCase(), pos);
  winalert(elem)
  drawalert()
  grid.changeturn();
}

  $('.space').on('click', function(){
    // debugger;
    if ($(this).attr('blank') === 'true') {
      if (grid.currentplayer === 'cato') {

        updateTurn(this, 'O');
        $('#dogx').css({'opacity' : '1'})
        $('#cato').css({'opacity' : '0.2'})
        // var side = "img/O.png";
        // var pos = $(this).data('pos');
        // $(this).html('<img src='+side+'>')
        // $(this).attr('blank', 'false');
        // grid.makenewgrid('io',pos);
        // winalert()
        // drawalert()
        // grid.changeturn();

      } else if (grid.currentplayer === 'dogx') {

        updateTurn(this, 'X');
        $('#cato').css({'opacity' : '1'})
        $('#dogx').css({'opacity' : '0.2'})
        // var side = "img/X.png";
        // var pos = $(this).data('pos');
        // $(this).html('<img src='+side+'>')
        // $(this).attr('blank', 'false');
        // grid.makenewgrid('ix',pos);
        // winalert()
        // drawalert()
        // grid.changeturn();

      }
    }


  });


  function winalert(elem) {
    if (grid.iswin()) {
      alert(grid.currentplayer+" is win");
    }
  }

  function drawalert() {
    if (grid.isdraw()) {
      alert("DRAW ");
    }
  }


});
