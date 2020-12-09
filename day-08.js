// part 1
program = $0.innerText
  .split('\n')
  .slice(0, -1)
  .map(x => ({ 
    instruction: x.split(' ')[0], 
    value: x.split(' ')[1]|0, 
    times_executed: 0
  }))

program_counter = 0
accumulator = 0

operands = { 
    nop: _ => { /* do nothing */ }, 
    acc: n => { accumulator+=n },
    jmp: n => { program_counter+=n }
}

while (true) {
    program[program_counter].times_executed++
    if (program[program_counter].times_executed === 2) break;

    let {instruction, value} = program[program_counter] // fetch
    operands[instruction](value) // execute

    if (instruction !== 'jmp') program_counter++
    if (program_counter >= program.length) program_counter = 0
}

console.log(`Accumulator value: ${accumulator}`)


// PART 2
input = () => document.body
  .innerText
  .split('\n')  // string -> list
  .slice(0, -1) // remove empty line
  .map(x => ({ 
    instruction: x.split(' ')[0],
    value: x.split(' ')[1]|0,
    times_executed: 0
  })) // transforms string in a json object, with the info we need.

// rules to swap instructions ( jmp -> nop | nop -> jmp )
swap_rules = { jmp: 'nop', nop: 'jmp', acc: 'acc' }

swap_instruction = x => swap_rules[x]

// returns program with one single instruction swapped.
mutate = (program, position) => { 
  // verboooooooooooooooooooooooooooooooooooooooose variables
  program[position].instruction = swap_instruction(program[position].instruction)
  return program 
}

// execute our 'program' object.
exec = program => {
  program_counter = 0
  accumulator = 0
  
  operands = {
    nop: _ => { /* do nothing */ },
    acc: n => { accumulator+=n },
    jmp: n => { program_counter+=n }
  }

  while (true) {
    program[program_counter].times_executed++

    // i chose a random threashold
    // no execution can run more than a thousand times.
    if (program[program_counter].times_executed == 1000) return false 
 
    let {instruction, value} = program[program_counter] // fetch
    
    // execute instruction
    operands[instruction](value)  

    if (instruction !== 'jmp') program_counter++
    if (program_counter >= program.length) return { accumulator, program_counter, program } 
  }
}

program_length = input().length

// bruteforce solution
// tries each program "mutation" 
// until the program can reach the end
for (i=0; i < program_length; i++) {

  program_version = mutate(input(), i)
 
  result = exec(program_version)
  if (result) {
    console.log(result)
    console.log({ program_version, iteration: i })
    break
  }
}

