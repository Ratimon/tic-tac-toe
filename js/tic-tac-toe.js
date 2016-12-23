;(function(global, $) {
  // hidden within the scope of the IIFE and never directly accessible

    // 'new' an object
    var Grid = function(player1, player2) {
        return new Grid.init(player1, player2);
    }
// ###########################
//Data definition
// ###########################
// Step 1 :Indentify immutable data


//Pos is interger[0,8].
//interp.
//The position of a square on the board, for a given p, then
// - The row is quotient of p / 3 or parseInt(p/3)
// - The column is the remainder  or p%3
//!! To make it easier, convert 0- based row and column to pos

// var r1 = 0
// var c1 = 0
// var r1_c1_to_pos = (0*3)+0

    // var pos = [ 0, 1, 2,
    //             3, 4, 5,
    //             6, 7, 8];

//rows is object of array, including positions of all the row
//interp.
    var rows = {
         firstR :  [0,1,2],
         secondR:  [3,4,5],
         thirdR :  [6,7,8],
       };
//columns is object of array, including positions of all the columns
//interp.
    var cols = {
         firstC :  [0,3,6],
         secondC:  [1,4,7],
         thirdC :  [2,5,8],
       };
//diagonall is object of array, including positions of all the columns//interp.
    var  digs = {
         firstD :  [0,4,8],
         secondD:  [2,4,6],
       };


 // ###########################
 //Functions definitions
 // ###########################
 // Step 1 :identify the methos

    // prototype holds methods (to save memory space)
    Grid.prototype = {


        // (invoke) -> object (this)
        //interp. given O or X , it will update the current grid and return this.
        changeturn : function(){
          var player1 = this.playername[0];
          var player2 = this.playername[1];
          // 'this' refers to the calling object at execution time
          if (this.currentplayer === player1 ) {
            this.currentplayer = player2;
          } else if (this.currentplayer === player2) {
            this.currentplayer = player1;
          }
          return this;
        },

        // string pos -> grid
        //interp. given O or X , it will update the current grid and return this.
        makenewgrid : function (xoro, pos) {
            this.currentgrid.splice(pos, 1, xoro);
            this.count +=1;
            return this;
        },

        resetgrid : function() {
          for (var i = 0; i < this.currentgrid.length; i++) {
            this.makenewgrid(false, i);
          } this.count = 0;
            return this;
        },
        //   (invoke)    -> object (this)
        //interp. return true if one player win
        iswin : function() {
          //  debugger;
           var player1 = this.playername[0];
           var player2 = this.playername[1]
          //update the win counter
          if ( this.rowwin() || this.colwin() || this.digwin()) {
            this.num_round +=1
            if (this.currentplayer === player1) {
              this.num_win[0] += 1;
            } else if (this.currentplayer === player2) {
              this.num_win[1] += 1;
            }
            alert(this.currentplayer+" wins")
          }
          return this;
        },

        //  rows||cols|| dia    -> boolean (helper)
        //interp. return true if one plyer succeeds in placing three  a horizontal , vertical, or diagonal
        eachwin : function(casetowin) {
          //  debugger;
            for (key in casetowin) {
              var count_o = 0;
              var count_x = 0;
              for (var j = 0; j < casetowin[key].length; j++) {
                if (this.currentgrid[casetowin[key][j]] === "io") {
                  count_o += 1;
                } else if (this.currentgrid[casetowin[key][j]] === "ix") {
                  count_x += 1;
                }
              } if ((count_o === 3) || (count_x === 3)) {
                return true;
              }
            } return false;
          },

        //  (invoke)    -> boolean (helper)
        //interp. return true if one plyer succeeds in placing three  a horizontal
        rowwin : function () {return this.eachwin(rows)},

        //  (invoke)   -> boolean (helper)
        //interp. return true if one plyer succeeds in placing three  a vertical
        colwin : function () {return this.eachwin(cols)},

        // (invoke)    -> boolean (helper)
        //interp. return true if one plyer succeeds in placing three  a vertical
        digwin : function () {return this.eachwin(digs)},


        // (invoke)   -> object (this)
        //interp. if all cells in grid are not blank and there is no winner,
        //        return true, otherwise false

        isdraw : function() {
          // debugger;
        if (this.isfull() && !(this.rowwin() || this.colwin() || this.digwin()) ) {
          this.num_draw += 1;
          this.num_round +=1;
          alert("DRAW ");
        }
        return this;
      },

        //   (invoke)   -> boolean (helper)
        //interp. if all cells in grid do not blank return true, otherwise false
        isfull : function() {
          if (this.count === 9) {
            return true;
          } else {
             return false
          }
        }

    };

//Step 2 Indentify vaiable Data and store them in new object

// grid is array of ( "io" || "ix" || false) that is 9 elements long
//interp.
//Visually grid is 3*3 squares, which has a row and column number
//(r, c)
//interp. of Pos below for how we convert back to (r , c)
//and position in a Board
// blank space is false

//###########Examples
// the game is not started
// var gd1 = [ false, false, false,
//                 false, false, false,
//                 false, false, false];
//
// //turn 2 for playerX && turn 1 for playerO
// var gd2 = [ "io", "ix", "io",
//                 false, false, false,
//                 false, false, false];
//
// var gd3 = [ "io",   "io",  "io",
//                 false,  "ix", false,
//                 false, false,  "ix"];


// the actual object is created here, allowing us to 'new' an object without calling 'new'
    Grid.init = function(player1, player2) {

        var self = this;
        self.currentgrid   = [ false, false, false,
                               false, false, false,
                               false, false, false];
        // currentplayer is string
        self.playername    = [ player1, player2];
        self.currentplayer =  "";
        self.num_win       =  { 0 : 0,
                                1 : 0
                              };
        self.num_draw      = 0;
        // count is number of turns in each round
        //every click add 1 to counter, helpful for isfull function below
        self.count         = 0;
        // num_round is number of rounds
        self.num_round     = 1;

    }

    // trick from jQuery, so we don't have to use the 'new' keyword
    Grid.init.prototype = Grid.prototype;

    // attach our Grid to the global object, and provide a shortcut '$G'
    global.Grid = global.G$ = Grid;

}(window, jQuery));


//Tests
// var name1 = $('#captaino').find('input').val() || 'captain';
// var name2 = $('#ironmanx').find('input').val() || 'ironman';
// var g = G$(name1, name2);
//
// console.log("test for grid.makenewgrid");
// console.log(g.makenewgrid('io',0)+" should = "+'["io", false, false, false, false, false, false, false, false]')
// console.log(g.makenewgrid('io',1)+" should = "+'["io", "io", false, false, false, false, false, false, false]')
// console.log(g.makenewgrid('io',1)+" should = "+'["io", "io", false, false, false, false, false, false, false]')
// console.log(g.makenewgrid('io',2)+" should = "+'["io", "io", "io", false, false, false, false, false, false]')
//
// console.log("test for resetgrid");
// console.log(g.resetgrid())
// console.log("This should set this.currentgrid to [false, false, false, false, false, false, false, false, false]");
// console.log(g.currentgrid);
//
// console.log("test for rowwin");
// console.log(g.resetgrid())
// console.log(g.makenewgrid('io',0))
// console.log(g.makenewgrid('io',1))
// console.log(g.makenewgrid('io',2))
// console.log(g.rowwin()+" should = true");
//
// console.log("test for colwin");
// console.log(g.resetgrid())
// console.log(g.makenewgrid('io',0))
// console.log(g.makenewgrid('io',3))
// console.log(g.makenewgrid('io',6))
// console.log(g.colwin()+" should = true");
//
// console.log("test for digwin");
// console.log(g.resetgrid())
// console.log(g.makenewgrid('io',0))
// console.log(g.makenewgrid('io',4))
// console.log(g.makenewgrid('io',8))
// console.log(g.digwin()+" should = true");
//
// console.log("test for iswin");
// console.log(g.resetgrid())
// console.log(g.makenewgrid('io',0))
// console.log(g.makenewgrid('ix',5))
// console.log(g.makenewgrid('io',3))
// console.log(g.makenewgrid('ix',4))
// console.log(g.makenewgrid('io',2))
// console.log(g.makenewgrid('ix',7))
// console.log(g.makenewgrid('io',1))
// console.log(g.iswin()+" should = true");
//
// console.log("test for isdraw");
// console.log(g.resetgrid())
// console.log(g.makenewgrid('io',0))
// console.log(g.makenewgrid('ix',2))
// console.log(g.makenewgrid('io',1))
// console.log(g.makenewgrid('ix',3))
// console.log(g.makenewgrid('io',5))
// console.log(g.makenewgrid('ix',4))
// console.log(g.makenewgrid('io',6))
// console.log(g.makenewgrid('ix',8))
// console.log(g.makenewgrid('io',7))
// console.log(g.isdraw()+" should = true")
