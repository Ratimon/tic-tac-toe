console.log("loaded");

$(document).ready(function() {

  $('.reset').on('click', function(){
    debugger
      var count_round = grid.num_round
      count_round += 1
      grid.num_round = count_round;
      $('h1').text("Round "+grid.num_round)
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
    $(this).css({'opacity' : '1'})
    $('h1').text("Round "+grid.num_round)
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



//  var words = $('#words').text().split(/[ ;\-,.\n]+/);
//  var $body = $('body');
//
//
//  var randy = function( max ) {
//    return Math.floor( Math.random() * max );
//  };
//
//
//  var putWord = function() {
//
//
//    var randomIndex = randy( words.length );
//    var text = words[randomIndex];
//
//
//    var $div = $('<div class="word">').html( text );
//
//
//    $div.css({
//      top: randy( window.innerHeight ) + 'px',
//      left: randy( window.innerWidth ) + 'px',
//      fontSize: (40 + randy(80)) + 'px'
//    });
//
//    $div.appendTo( $body );
//
//    $div.fadeIn(1000).fadeOut(2000, function(){
//      $(this).remove();
//    });
//
//  };
//
//  setInterval(putWord, 100);
//
// });
