console.log("loaded");

var gameStarted = false;
var name1 = ''; //$('#captaino').find('input').val() || 'captain';
var name2 = ''; //$('#ironmanx').find('input').val() || 'ironman';
var g = null;   //= G$(name1, name2);


$(document).ready(function() {


// console.log(name1, name2);

  $('.player').on('click', function(){

    if ($(this).attr('id')==='captaino') {
      // g.currentplayer = name1;
    } else if ($(this).attr('id')==='ironmanx') {
      // g.currentplayer = name2;
    }
    $(this).css({'opacity' : '1'})
    // $('h1').text("Round "+g.num_round)
  });


  $('#captaino button').on('click', function () {
    name1 = $('#captaino input').val() || "Steve";
    // console.log('captaino click', name1);
    if(name1.length && name2.length && !gameStarted){
      // both names are now set
      // console.log('captaino click start game', name1, name2, name1.length, name2.length);
       g = G$(name1, name2); //use my library
       g.currentplayer = name2;
       startGame();
     }

  });
  $('#ironmanx button').on('click', function () {
    name2 = $('#ironmanx input').val() || "Tony";
    // console.log('ironman click', name2);
    if(name1.length && name2.length && !gameStarted){
      // both names are now set
      // console.log('ironman click start game', name1, name2, name1.length, name2.length);
      g = G$(name1, name2);
      g.currentplayer = name1;
      startGame();
    }
  });

  var updateTurn = function(elem, symbol){

    var side = "img/" + symbol + ".png";
    var pos = $(elem).data('pos');
    $(elem).html('<img src='+side+'>').attr('blank', 'false');
    g.makenewgrid('i' + symbol.toLowerCase(), pos).iswin().isdraw().changeturn()
    $('#captaino').find('.count').text(g.playername[0]+' (Win : '+g.num_win[0]+' Draw : '+g.num_draw+' Loss : '+(g.num_win[1]+')'));
    $('#ironmanx').find('.count').text(g.playername[1]+' (Win : '+g.num_win[1]+' Draw : '+g.num_draw+' Loss : '+(g.num_win[0]+')'));
  }

  var startGame = function(){
    // debugger;
    gameStarted = true;

    $('h1').text("Round "+g.num_round)

    $('.space').on('click', function(){
      //  debugger;
      if ($(this).attr('blank') === 'true') {
        if (g.currentplayer === name1) {
          updateTurn(this, 'O');
          $('#ironmanx').css({'opacity' : '1'})
          $('#captaino').css({'opacity' : '0.2'})

        } else if (g.currentplayer === name2) {
          updateTurn(this, 'X');
          $('#captaino').css({'opacity' : '1'})
          $('#ironmanx').css({'opacity' : '0.2'})

        }
      }
    });

    $('.reset').on('click', function(){
        $('h1').text("Round "+g.num_round)
        // console.log( g.num_win[0]+"and"+g.num_win[1]);
        g.resetgrid();
        $('.space').empty().attr("blank", 'true');
        $('.player').css({'opacity' : '0.2'});

    });

  }; // end startGame()

 });







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
