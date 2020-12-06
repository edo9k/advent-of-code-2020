//  PART 1
all_codes = document.body.innerText.split('\n') // fetch seat codes
all_codes.pop() // trash empty element

// this is what puke would look like if one could puke in js
// it gets the code, spits its integer value.
parse = code => '0b'+code.split('').map(x => /B|R/.test(x)|0).join('')|0

decoded = all_codes.map(seat_code => {
  row = parse(seat_code.slice(0,7))
  column = parse(seat_code.slice(7))

  return {
    seat_code,
    row, column,
    id: row * 8 + column  
  }
})


// seat with the highest id
console.log( decoded.sort( (a,b) => b.id - a.id )[0] )

// PART 2
only_ids = decoded.sort( (a,b) => a.id - b.id ).map(x => x.id)

// will print the missing seat... and a false positive after that. whatevs. 
for (i=0; i < only_ids.length; i++) {
  if ( (only_ids[i] + 1) !== only_ids[i+1] ) {
    console.log(`Missing a seat between ${ only_ids[i] } and ${ only_ids[i+1] }.`) 
  }
}

