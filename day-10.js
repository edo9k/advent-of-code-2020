// PART 1
input = document.body.innerText
  .split('\n')
  .slice(0, -1)
  .map(x => x|0)
  .sort( (a,b) => a-b )

count = (list) => {

  for(i=1, totals = {1:0, 2: 0, 3: 1}; i < list.length; i++ ) {
    totals[ list[i] - list[i-1] ]++
  }
  return totals
}

result = count([0, ...input])

part1 = result[1] * result[3]

// PART 2
chunk = lista => {
  result = []
  begin = 0
  for ( i = 0; i < lista.length; i++) {
    if (lista[i] + 1 !== lista[i+1]) { 
      result.push( lista.slice(begin, i))
      begin = i 
    }
  }
  return result
}

multipliers = { 5: 7, 4: 4, 3: 2 } // number of possible permutation on each block

part2 = chunk([0, ...input, input.slice(-1)+3]) // adding first and last elements
  .map(x => x.length) // we only want chunk lengths
  .filter(x => x > 2) // only groups with length 3+ matter

part2[0]++ // don't even ask... somehow `chunk` misses on member of the first group

part2.map(x => multipliers[x]).reduce( (a,b) => a*b, 1)

