var ttt = {

  settings: {
    userSign: 'x',
    compSign: 'o',
    firstTurn: 'user',
  },

  elements: {
    td: $('td')
  },

  bindUIActions: function() {
  },

  init: function init() {
    s = this.settings;
    el = this.elements;
    this.availableMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    this.viableWins = [[1, 4, 7], [1, 2, 3], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]]
    this.compViable = this.viableWins.slice();
    this.userViable = this.viableWins.slice();
    this.userMoves = [];
    this.compMoves = [];
    this.clearBoard();
    if (s.firstTurn === 'user') {
      this.usersTurn();
    } else {
      this.compPlay();
    }
  },
  usersTurn: function() {
    var move,
    moveId,
    self = this;
    el.td.on('click', function() {
      move = $(this);
      moveID = move.data('id');
      if (self.isViable(moveID) ) {
        move.text(s.userSign);
        self.userMoves.push(moveID);
        self.rmMove(moveID);
        self.rmCompWin(moveID, self.compViable);
        el.td.off('click');
        self.compsTurn();
      }
    });
  },


  compsTurn: function() {
    var self = this,
    move = false;

    if ( self.compViable.length < 1 ) {
      alert('Cats game');
      return;
    }

    if ( !move ) {
      // Check for winning Move
      self.compViable.forEach(function(win) {
        var winCheck = [],
        winningMove = false;
        win.forEach(function(number) {
          if (self.compMoves.indexOf(number) > -1) {
            winCheck.push(number);
          }
        });
        if (winCheck.length > 1) {
          winningMove = win.difference(winCheck)[0];
          move = winningMove;
          alert('Comp won');
        }
      });
    }

    if ( !move ) {
      // Check for block
      self.userViable.forEach(function(win) {
        var winCheck = [],
        blockingMove = false;
        win.forEach(function(number) {
          if (self.userMoves.indexOf(number) > -1) {
            winCheck.push(number);
          }
        });
        if (winCheck.length > 1) {
          blockingMove = win.difference(winCheck)[0];
          move = blockingMove;
        }
      });
    }

    if ( !move ) {
      // Check for best move
      var winNumbers = self.compViable.reduce(function(a, b) {
        return a.concat(b);
      }),
      i = 0,
        bestMove = false,
        occurences,
          mostOccurences = 0,
          unique = winNumbers.unique();

      // Count number of uniques
      for (; i < unique.length; i++ ) {
        occurences = winNumbers.filter(function(n) {
          return n === unique[i];
        }).length;
        if (occurences > mostOccurences && self.compMoves.indexOf(unique[i]) === -1) {
          mostOccurences = occurences;
          bestMove = unique[i];
        }
      }
      move = bestMove;
    }

    self.compMark(move);
    self.compMoves.push(move);
    self.rmMove(move);
    self.rmUserWin(move);
    self.usersTurn();
  },
  endGame: function() {
  },
  isViable: function(move) {
    return (this.availableMoves.indexOf(move) > -1);
  },
  rmMove: function(move) {
    this.availableMoves.remove(move);
  },
  rmCompWin: function(move) {
    this.compViable = this.compViable.filter(function(win, index) {
      if (win.indexOf(move) === -1) {
        return win;
      }
    });
  },
  rmUserWin: function(move) {
    this.userViable = this.userViable.filter(function(win, index) {
      if (win.indexOf(move) === -1) {
        return win;
      }
    });
  },
  compMark: function(val) {
    $('.game-board td[data-id=' + val + ']').text('O');
  },
  clearBoard: function clear() {
    $('td').text('');
  }
}
ttt.init();
