console.log("loaded");
//Data definition
// ###########################
// Step 1 :Indentify constant information

// currentplayer is string ( catx or dogo)

//Pos is interger[0,8].
//interp.
//The position of a square on the board, for a given p, then
// - The row is quotient of p / 3 or parseInt(p/3)
// - The column is the remainder  or p%3
//!! To make it easier, convert 0- based row and column to pos

// var r1 = 0
// var c1 = 0
// var r1_c1_to_pos = (0*3)+0

var pos = [ 0, 1, 2,
            3, 4, 5,
            6, 7, 8]

// ###########################
//Step 2 Indentify Changinng information

// grid is array of ( "io" || "ix" || false) that is 9 elements long
//interp.
//Visually grid is 3*3 squares, which has a row and column number
//(r, c)
//interp. of Pos below for how we convert back to (r , c)
//and position in a Board
// blank space is false

//###########Examples
// the game is not started
var gd1 = [ false, false, false,
            false, false, false,
            false, false, false]

//turn 2 for playerX && turn 1 for playerO
var gd2 = [ "io", "ix", "io",
            false, false, false,
            false, false, false]

var gd3 = [ "io",   "io",  "io",
            false,  "ix", false,
            false, false,  "ix"]


// ###########################
//Step 3 Indentify event opetions
//1. choose the .player --  click event
//2. draw vo || .space --  click event
//3. restart || .#restart -- click event
//4.  (click event (buttopn)) -> show background of cat // or dog
//interp. when cliking





var grid = {

  currentplayer : "",

  changeturn : function(){
     if (this.currentplayer === "cato") {
       this.currentplayer = "dogx";
     } else if (this.currentplayer === "dogx") {
       this.currentplayer = "cato";
     } else {
       alert('please choose your side')
     }
    },

  currentgrid : [ false, false, false,
                  false, false, false,
                  false, false, false],


//every click add 1 to counter, helpful for isfull function below
  count : 0,

//rows is object of array, including positions of all the row
//interp.
  rows : {
    firstR :  [0,1,2],
    secondR:  [3,4,5],
    thirdR :  [6,7,8],
  },
//columns is object of array, including positions of all the columns
//interp.
  cols : {
    firstC :  [0,3,6],
    secondC:  [1,4,7],
    thirdC :  [2,5,8],
  },
//diagonall is object of array, including positions of all the columns//interp.
  digs : {
    firstD :  [0,4,8],
    secondD:  [2,4,6],
},
// ###########################
//Functions definitions
// ###########################


// string pos -> grid
//interp. given O or X , it will update the current grid.

  makenewgrid : function (xoro, pos) {
      this.currentgrid.splice(pos, 1, xoro);
      this.count +=1
      return this.currentgrid; //this line is not neccesary
  },

  resetgrid : function() {
    for (var i = 0; i < this.currentgrid.length; i++) {
      this.makenewgrid(false, i);
    } this.count = 0;
  },

//    None    -> boolean
//interp. return true if one plyer win
  iswin : function() {
    // debugger;
    if (this.rowwin() || this.colwin() || this.digwin()) {
      return true;
    } else {
      return false
    }
  },

//  rows||cols|| dia    -> boolean
//interp. return true if one plyer succeeds in placing three  a horizontal , vertical, or diagonal
  eachwin : function(casetowin) {
    // debugger;
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

//  None    -> boolean
//interp. return true if one plyer succeeds in placing three  a horizontal
  rowwin : function () {return this.eachwin(this.rows)},

//  None    -> boolean
//interp. return true if one plyer succeeds in placing three  a vertical
  colwin : function () {return this.eachwin(this.cols)},

//  None    -> boolean
//interp. return true if one plyer succeeds in placing three  a vertical
  digwin : function () {return this.eachwin(this.digs)},


//    None    -> boolean
//interp. if all cells in grid are not blank and there is no winner,
//        return true, otherwise false

  isdraw : function() {
  if (this.isfull() && !this.iswin() ) {
    return true;
  } else {
    return false
  }
},

//    None   -> boolean
//interp. if all cells in grid do not blank return true, otherwise false
  isfull : function() {
    if (this.count === 9) {
      return true;
    } else {
      return false
    }
  }


}

// console.log("test for grid.makenewgrid");
// console.log(grid.makenewgrid('io',0)+" should = "+'["io", false, false, false, false, false, false, false, false]')
// console.log(grid.makenewgrid('io',1)+" should = "+'["io", "io", false, false, false, false, false, false, false]')
// console.log(grid.makenewgrid('io',2)+" should = "+'["io", "io", "io", false, false, false, false, false, false]')
//
// console.log("test for resetgrid");
// console.log(grid.resetgrid())
// console.log("This should set this.currentgrid to [false, false, false, false, false, false, false, false, false]");
// console.log(grid.currentgrid);
//
// console.log("test for rowwin");
// console.log(grid.resetgrid())
// console.log(grid.makenewgrid('io',0))
// console.log(grid.makenewgrid('io',1))
// console.log(grid.makenewgrid('io',2))
// console.log(grid.rowwin()+" should = true");
//
// console.log("test for colwin");
// console.log(grid.resetgrid())
// console.log(grid.makenewgrid('io',0))
// console.log(grid.makenewgrid('io',3))
// console.log(grid.makenewgrid('io',6))
// console.log(grid.colwin()+" should = true");
//
// console.log("test for digwin");
// console.log(grid.resetgrid())
// console.log(grid.makenewgrid('io',0))
// console.log(grid.makenewgrid('io',4))
// console.log(grid.makenewgrid('io',8))
// console.log(grid.digwin()+" should = true");
//
// console.log("test for iswin");
// console.log(grid.resetgrid())
// console.log(grid.makenewgrid('io',0))
// console.log(grid.makenewgrid('ix',5))
// console.log(grid.makenewgrid('io',3))
// console.log(grid.makenewgrid('ix',4))
// console.log(grid.makenewgrid('io',2))
// console.log(grid.makenewgrid('ix',7))
// console.log(grid.makenewgrid('io',1))
// console.log(grid.iswin()+" should = true");
//
// console.log("test for isdraw");
// console.log(grid.resetgrid())
// console.log(grid.makenewgrid('io',0))
// console.log(grid.makenewgrid('ix',2))
// console.log(grid.makenewgrid('io',1))
// console.log(grid.makenewgrid('ix',3))
// console.log(grid.makenewgrid('io',5))
// console.log(grid.makenewgrid('ix',4))
// console.log(grid.makenewgrid('io',6))
// console.log(grid.makenewgrid('ix',8))
// console.log(grid.makenewgrid('io',7))
// console.log(grid.isdraw()+" should = true")
