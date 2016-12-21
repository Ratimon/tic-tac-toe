console.log("loaded");

var player = {
  // currentplayer is string ( catx or dogo)
    currentplayer : "",

    catname : "cat" ,

    dogname : "dog" ,

  // round is number of round
    num_round : 1,

    changeturn : function(){
      debugger;
       if (this.currentplayer === this.catname) {
         this.currentplayer = this.dogname;
       } else if (this.currentplayer === this.dogname) {
         this.currentplayer = this.catname;
       } else {
         alert('please choose your side')
       }
      }
}

$(document).ready(function() {




  $('.reset').on('click', function(){
      var count_round = player.num_round
      count_round += 1
      player.num_round = count_round;
      $('h1').text("Round "+player.num_round)
      player.currentplayer = ""
      grid.resetgrid();
      $('.space').empty();
      $('.space').attr("blank", 'true');
      $('.player').css({'opacity' : '0.2'});

  });

//choose side
  $('.player').on('click', function(){
    // debugger;
    if ($(this).attr('id')==='cato') {
      player.catname = $('#cato').find('input').val()
      player.currentplayer = player.catname;
    } else if ($(this).attr('id')==='dogx' ) {
      player.dogname = $('#dogx').find('input').val()
      player.currentplayer = player.dogname;
    }
    $(this).css({'opacity' : '1'})
    $('h1').text("Round "+player.num_round)
  });




var updateTurn = function(elem, symbol){

  var side = "img/" + symbol + ".jpg";
  var pos = $(elem).data('pos');
  $(elem).html('<img src='+side+'>')
  $(elem).attr('blank', 'false');
  grid.makenewgrid('i' + symbol.toLowerCase(), pos);
  winalert(elem)
  drawalert()
  player.changeturn();
}


  $('.space').on('click', function(){
    //  debugger;
    if ($(this).attr('blank') === 'true') {
      if (player.currentplayer === player.catname) {

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

      } else if (player.currentplayer === player.dogname) {

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
    debugger;
    if (grid.iswin()) {
      alert(player.currentplayer+" is win");
    }
  }

  function drawalert() {
    debugger;
    if (grid.isdraw()) {
      alert("DRAW ");
    }
  }



 var words = $('#words').text().split(/[ ;\-,.\n]+/);
 var $body = $('body');


 var randy = function( max ) {
   return Math.floor( Math.random() * max );
 };


 var putWord = function() {


   var randomIndex = randy( words.length );
   var text = words[randomIndex];


   var $div = $('<div class="word">').html( text );


   $div.css({
     top: randy( window.innerHeight ) + 'px',
     left: randy( window.innerWidth ) + 'px',
     fontSize: (40 + randy(80)) + 'px'
   });

   $div.appendTo( $body );

   $div.fadeIn(1000).fadeOut(2000, function(){
     $(this).remove();
   });

 };

 setInterval(putWord, 100);

});
