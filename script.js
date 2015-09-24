Array.prototype.unique = function() {
  return this.
  reduce(function(pre, curr) {
    if (pre.indexOf(curr) === -1) {
      pre.push(curr);
    }
    return pre;
  }, []);
};

Array.prototype.difference = function(secondArray) {
  return this.filter(function(i) {
    return secondArray.indexOf(i) < 0;
  });
};

var ttt = {
  player: 'X',
  computer: 'O',

  init: function init() {
    ttt.availableMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    ttt.possibleWins = [
      [1, 4, 7],
      [1, 2, 3],
      [1, 5, 9],
      [2, 5, 8],
      [3, 6, 9],
      [3, 5, 7],
      [4, 5, 6],
      [7, 8, 9]
    ];
    ttt.compPossibleWins = ttt.possibleWins.slice();
    ttt.playerPossibleWins = ttt.possibleWins.slice();
    ttt.playerMoves = [];
    ttt.compMoves = [];
    ttt.clearBoard();
    ttt.playerTurn();
    //ttt.compPlay();
    //ttt.playerTurn();
  },
  compPlay: function compPlay() {
    var haveMoved = false;

    if (!haveMoved) {
      console.log('win');
      ttt.compPossibleWins.forEach(function(winningArray) {
        if (!haveMoved) {
          var matches = 0,
            holdingArray = [];
          winningArray.forEach(function(numberInWinningArray) {
            if (ttt.compMoves.indexOf(numberInWinningArray) > -1) {
              matches += 1;
              holdingArray.push(numberInWinningArray);
            }
          });
          if (matches > 1) {
            var win = winningArray.difference(holdingArray)[0];
            // ttt.playerPossibleWins = ttt.playerPossibleWins.filter(function(array) {
            //   if (array.indexOf(block) === -1) {
            //     return array;
            //   }
            // });
            // Remove move from board
            //ttt.removePlay(block);
            ttt.compMark(win);
            alert('Comp won');
            //ttt.compMoves.push(block);
            haveMoved = true;
            return;
          }
        }
      });
    }

    if (!haveMoved) {
      console.log('block');
      // Block
      ttt.playerPossibleWins.forEach(function(winningArray) {
        var matches = 0,
          holdingArray = [];
        winningArray.forEach(function(numberInWinningArray) {
          if (ttt.playerMoves.indexOf(numberInWinningArray) > -1) {
            matches += 1;
            holdingArray.push(numberInWinningArray);
          }
        });
        if (matches > 1) {
          var block = winningArray.difference(holdingArray)[0];
          ttt.playerPossibleWins = ttt.playerPossibleWins.filter(function(array) {
            if (array.indexOf(block) === -1) {
              return array;
            }
          });
          // Remove move from board
          ttt.removePlay(block);
          ttt.compMark(block);
          ttt.compMoves.push(block);
          haveMoved = true;
          return;
        }

      });
    }
    if (!haveMoved) {
      console.log('best move');
      // The best move is the number with the most
      // occurences in the winning possibilities?
      var flat = ttt.compPossibleWins.reduce(function(a, b) {
        return a.concat(b);
      });
      var i = 0,
        bestMove,
        occurences,
        mostOccurences = 0,
        unique = flat.unique();

      for (; i < unique.length; i++) {
        occurences = flat.filter(function(x) {
          return x === unique[i];
        }).length;

        if (occurences > mostOccurences && ttt.compMoves.indexOf(unique[i]) === -1) {
          mostOccurences = occurences;
          bestMove = unique[i];
        }
      }
      ttt.compMoves.push(bestMove);
      //console.log(bestMove);
      // Remove possible wins from player
      ttt.playerPossibleWins = ttt.playerPossibleWins.filter(function(array) {
        if (array.indexOf(bestMove) === -1) {
          return array;
        }
      });
      // Remove move from board
      ttt.removePlay(bestMove);
      // Make Move
      ttt.compMark(bestMove);
    }
    console.log('comp is done');
    ttt.playerTurn();
  },
  removePlay: function(val) {
    ttt.availableMoves.splice(ttt.availableMoves.indexOf(val), 1);
  },
  compMark: function(val) {
    console.log('Marked');
    var eq = val - 1;
    $('.game-board td[data-id=' + val + ']').text('O');
  },
  clearBoard: function clear() {
    $('td').text('');
  },
  playerTurn: function playerTurn() {
    //console.log(ttt.availableMoves);
    $('td').on('click', function() {
      //alert('ok');
      var move = ($(this).data("id"));
      console.log('------------------players moves--------------', move);
      if (ttt.availableMoves.indexOf(move) > -1) {
        $(this).text(ttt.player);
        $('td').off('click');
        ttt.playerMoves.push(move);
        ttt.availableMoves.splice(ttt.availableMoves.indexOf(move), 1);

        // Remove possible wins from computer
        ttt.compPossibleWins = ttt.compPossibleWins.filter(function(array) {
          if (array.indexOf(move) === -1) {
            return array;
          }
        });
        ttt.compPlay();
        // if (ttt.availableMoves.length < 1) {
        //   ttt.gameOver();
        // }
        //   ttt.compPlay();
        // }
      };
    });
  }
}
ttt.init();
