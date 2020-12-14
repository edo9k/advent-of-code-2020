input = document.body.innerText.split('mask')

// global memory
mem = {}

apply_mask = (number, mask) => {
  bits = number.toString(2).padStart(36, '0').split('')
  for([index, bit] of bits.entries())
    if (mask[index] !== 'X')
      bits[index] = mask[index]
  return eval('0b'+bits.join(''))
}

mask_cycle = program => {
  instructions = program.split('\n').filter(x => x)	

  //console.log( instructions.slice(1)[1].match(/(\d+)/g) )

  // get mask
  mask = instructions[0].match(/([X01]+)/)[0].split('')

  // apply mask and store
  instructions.slice(1).forEach(x => {
    //console.log(x.match(/(\d+)/g));
    [position, number] = x.match(/(\d+)/g)
    mem[position] = apply_mask(number|0, mask)
  })

}

// run through inputs
input.filter(x => x).forEach(mask_cycle)

//console.log(mem, Object.values(mem).reduce( (a,b) => a+b, 0))

// show result
console.log( 
  Object.values(mem)
    .reduce( (a,b) => a+b, 0)) // sum all memory values

