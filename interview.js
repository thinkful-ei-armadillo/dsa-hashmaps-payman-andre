const HashMap = require('./HashMap');

function movieList(length, movies = [60, 120, 40, 55, 65, 45]) {
  let hash = new HashMap();
  debugger;

  for (let i = 0; i < movies.length; i++) {
    hash.set(movies[i], []);
    let curr = hash.get(movies[i]);
    for (let j = 0; j < movies.length; j++) {
      if (movies[i] !== movies[j]) {
        if (movies[i] + movies[j] === length) {
          hash.set(movies[i], [...curr, movies[j]]);
        }
      }
    }
  }
  return hash;
}

console.log(movieList(180));

/*function movieList(length, movies = [60, 120, 40, 55, 65, 115, 45]) {
  let hash = new HashMap();

  for (let i = 0; i < movies.length; i++) {
    try {
      let second = length - movies[i];
      hash.get(second);
      return true;
    } catch (e) {
      hash.set(movies[i], '');
    }
  }
  return false;
}*/
