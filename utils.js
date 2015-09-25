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

Array.prototype.remove = function(number) {
  var index = this.indexOf(number);
  if (index > -1 ) {
    this.splice(this.indexOf(number), 1);
  }
  return this;
}

