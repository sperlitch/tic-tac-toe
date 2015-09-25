var ttt = {

  settings: {
    userSign: 'x',
    compSign: 'o',
    firstTurn: 'user',
  },

  elements: {
    td: $('td'),
    flash: $('.flash'),
    reset: $('.reset')
  },


  init: function init() {
    s = this.settings;
    el = this.elements;
    this.availableMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.viableWins = [[1, 4, 7], [1, 2, 3], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]];
    this.compViable = this.viableWins.slice();
    this.userViable = this.viableWins.slice();
    this.userMoves = [];
    this.compMoves = [];
    this.bindUIActions();
    this.clearBoard();
    if (s.firstTurn === 'user') {
      this.usersTurn();
    } else {
      this.compsTurn();
    }
  },
  bindUIActions: function() {
    var self = this;
    el.reset.on('click', function(e) {
      self.init();
    });
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
        if (self.checkUserWin() === true) {
          self.flash('User wins!', 'alert-success');
        } else {
          self.compsTurn();
        }
      }
    });
  },

  compsTurn: function() {
    var self = this,
    move = false;
    if ( self.compViable.length < 1 && self.userViable.length < 1) {
      self.flash('Cats game', 'alert-warning');
      return;
    } else {
      self.usersTurn();
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
          self.flash('You didn\'t win', 'alert-danger');
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
      if (self.compViable.length > 1) {
      var winNumbers = self.compViable.reduce(function(a, b) {
        return a.concat(b);
      }),
      i = 0,
        bestMove = false,
        occurences,
          mostOccurences = 0,
          unique = winNumbers.unique();

      // Best move is the number that occurs most in winning arrays
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
      } else {
        move = self.availableMoves[0];
        self.flash('Cats game', 'alert-warning');
        self.endGame();
      }
    }

    self.compMark(move);
    self.compMoves.push(move);
    self.rmMove(move);
    self.rmUserWin(move);
  },
  checkUserWin: function() {
    var self = this,
        winCheck = [];
    self.userViable.forEach(function(win) {
      winCheck = [];
      console.log(win);
      win.forEach(function(number) {
        console.log(self.userMoves);
        if (self.userMoves.indexOf(number) > -1) {
          winCheck.push(number);
        }
      });
    });
    if (winCheck.length > 2) {
      return true;
    }
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
  }, 
  flash: function(text, style) {
    el.flash.addClass(style);
    el.flash.text(text);
  }
}
ttt.init();
