const HashMap = require('./HashMap');
const HashMapChain = require('./HashMapChain');

function removeDupes(str) {
  const hash = new HashMap();
  let toReturn = '';

  for (let i = 0; i < str.length; i++) {
    try {
      const check = hash.get(str[i]);
    } catch (e) {
      hash.set(str[i], str[i]);
      toReturn += str[i];
    }
  }

  return toReturn;
}

function canBePalindrome(str) {
  const hash = new HashMap();

  for (let i = 0; i < str.length; i++) {
    try {
      let check = hash.get(str[i]);

      hash.set(str[i], ++check);
    } catch (e) {
      hash.set(str[i], 1);
    }
  }

  let oddChar = null;

  for (let i = 0; i < str.length; i++) {
    const charCount = hash.get(str[i]);

    if (charCount % 2 === 1) {
      if (oddChar === null || oddChar === str[i]) {
        oddChar = str[i];
      } else {
        return false;
      }
    }
  }

  return true;
}

function anagramGrouping(arr) {
  let toReturn = [];
  let allHash = new HashMap();
  arr.forEach(word => {
    let hash = new HashMap();
    for (let i = 0; i < word.length; i++) {
      try {
        let check = hash.get(word[i]);
        hash.set(word[i], ++check);
      } catch (e) {
        hash.set(word[i], 1);
      }
    }
    allHash.set(word, hash);
  });
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    let hashOfWord = allHash.get(word);
    if (hashOfWord !== 'CHECKED') {
      toReturn[count] = [word];
      for (let j = 0; j < arr.length; j++) {
        const wordToCheck = arr[j];
        if (word !== wordToCheck && word.length === wordToCheck.length) {
          let isSame = true;
          for (let index = 0; index < word.length; index++) {
            let letter = word[index];
            try {
              if (
                allHash.get(word).get(letter) !==
                allHash.get(wordToCheck).get(letter)
              ) {
                isSame = false;
                break;
              }
            } catch (e) {
              isSame = false;
              break;
            }
          }
          if (isSame) {
            toReturn[count].push(wordToCheck);
            allHash.set(wordToCheck, 'CHECKED');
          }
        }
      }
      allHash.set(word, 'CHECKED');
      count++;
    }
  }
  return toReturn;
}

function main() {
  const hash = new HashMap();

  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;

  hash.set('Hobbit', 'Bilbo');
  hash.set('Hobbit', 'Frodo');
  hash.set('Wizard', 'Gandolf');
  hash.set('Human', 'Aragon');
  hash.set('Elf', 'Legolas');
  hash.set('Maiar', 'The Necromancer');
  hash.set('Maiar', 'Sauron');
  hash.set('RingBearer', 'Gollum');
  hash.set('LadyOfLight', 'Galadriel');
  hash.set('HalfElven', 'Arwen');
  hash.set('Ent', 'Treebeard');

  // "Maiar" and "Hobbit" only have one key-value pair because they are overwritten
  // The capacity after adding the items changes from 8 to 24 (8 times 3)

  //console.log(hash._hashTable);

  // console.log(removeDupes('google all that you think can think of'));

  console.log(canBePalindrome('racecar'));
  console.log(canBePalindrome('north'));

  console.log(
    anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])
  );

  const hashChain = new HashMapChain();
  hashChain.set('Hobbit', 'Bilbo');
  hashChain.set('Hobbit', 'Frodo');
  hashChain.set('Wizard', 'Gandolf');
  hashChain.set('Human', 'Aragon');
  hashChain.set('Elf', 'Legolas');
  hashChain.set('Maiar', 'The Necromancer');
  hashChain.set('Maiar', 'Sauron');
  hashChain.set('RingBearer', 'Gollum');
  hashChain.set('LadyOfLight', 'Galadriel');
  hashChain.set('HalfElven', 'Arwen');
  hashChain.set('Ent', 'Treebeard');
  console.log(hashChain._hashTable);
}

main();

// 2. WhatDoesThisDo
/* it makes two maps, both with indices 'Hello World.'. The first has a value of
20 and the second has a value of 10. So this function will console log "20 10" */

// 3. Demonstrate understanding
/*
  1)

  [22, 88, _, _, 4, 15, 28, 17, 59, 31, 10]   arr
    2   8        4   5   6   7   9   3   1    map order


  2)

  [10, 28, 19, 20, 12, 5, 15, 33, 17]   arr
    9   2   3   5   7  1   4   6   8    map order
*/
