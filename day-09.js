// PART 1
input = document.body 
  .innerText            // get input
  .split('\n')          // break on CR
  .slice(0, -1)         // remove last element
  .map(x => parseInt(x)) // cast to int

preamble_length = 25

input_length = input.length

// get sum of a list
get_sums = ([head, ...rest]) => rest.length 
  ? [
    ...rest.map(x => x + head), 
    ...get_sums(rest)
  ] 
  : []

// find the number according to puzzle requirements
find = (list, position) => {

  // if this passes, my code is broken. 
  if (position === input_length) return 'error: not found'

  // if the number fits this description, it's not who we're looking for.
  if (get_sums(list.slice(position - preamble_length, position)).includes(list[position])) // hideous. 
    return find(list, position+1) // try next number

  return list[position] // number found. return it.
}

// store number to use in Part 2
number = find(input, preamble_length)

// answer
console.log(`Part 1 answer: ${number}`)

// PART 2

find_sublist = list => {
  sublist_length = 2 // keeps tabs on how long the sublist is.

  // loop (hopefully not) forever
  while (true) {
    for (i = sublist_length; i < list.length; i++) {
      sublist = input.slice(i - sublist_length, i)
      total = sublist.reduce( (a,b) => a+b, 0)

      // if true, we found the answer.
      if (number === total) {
        //console.log({ sublist, sublist_length, total, number })
        return Math.min(...sublist) + Math.max(...sublist)
      }   /* if */
    }     /* for */

    // increase list size for next try. 
    sublist_length++

  } /* while loop */
}

// display answer
console.log(`Part 2 answer: ${ find_sublist(input) }`)

