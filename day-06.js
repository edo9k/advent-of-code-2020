// PART 1
answers = document.body.innerText.split('\n\n') // get input

valid_answers = x => (new Set(only_abc(x))).size // hideous syntax, in Haskell it would be do "a . b . c"

only_abc = s => [...s].filter(x => /\w/.test(x)) // i could have used .join(''), but Set() doesn't care.

count1 = answers.map(valid_answers).reduce( (a,b) => a + b, 0)

console.log(count1)

// PART 2

// string version, a list version should use Sets
intersection = (a,b) => [...a].filter(x => -1 !== b.indexOf(x))

count2 = answers
    .map( x=> x
      .split('\n')            // split answers in lines
      .filter(x => x)         // remove empty lines
      .reduce(intersection))  // get only letters that exist in all lines
  .map(x => x.length)         // get length of each answer
  .reduce( (a,b) => a + b, 0) // sum

console.log(count2)

