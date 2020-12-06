// PART 1
const input_list = document.body.innerText.split('\n') // get input
input_list.pop()  // throw away last empty element

const valid_passes = input.list.filter(x => {
  const [min, max] = x.split(' ')[0].split('-')
  const letter     = x.split(' ')[1][0]
  const password   = x.split(' ')[2]

  const letter_count = password
    .split(' ')
    .filter(x => x === letter)
    .length
  
  // is this mofocker valid?
  return letter_count <= max && letter_count >= min

  // i.e.:  number of letter occurencies
  //        has to be within the defined contraints
}).length

console.log(valid_passes)

// PART 2
const xor = (a, b) => a !== b // not needed, but i want to have it.

const valid_passes2 = input_list.filter(x => {
  const [position1, position2] = x.split(' ')[0].split('-')
  const letter    = x.split(' ')[1][0]
  const password  = x.split(' ')[2]

  const letter_count = password
    .split('')
    .filter(x => x === letter)
    .length

  return xor( 
    password[position1 - 1] === letter,
    password[position2 - 1] === letter
  )
}).length

console.log(valid_passes2)

