// PART 1

// get input
input = document.body.innerText
  .replaceAll('bags', 'bag') // send plurals to the gulag. 
  .split('\n')  // lists are the one true data structure.
  .slice(0,-1)  // deal with those pesky empty lines.

// get bag name from string
get_bag_name = s => s.match(/\w+ \w+ \w+/)[0] //.trim()

// bag name -> list of bags that contain the input bag name
contain = bag => input
  .filter(x => -1 !== x.indexOf(bag))
  .map(get_bag_name)
  .filter(x => x !== bag) // the name will match it's own bag, remove it.

// calls `contain` for all resulting bags, until the result is an empty set
recurse = bag_list => bag_list.length 
  ? [ 
      matches = bag_list.map(contain), 
      matches.map(recurse) 
    ]
  : []

// remove duplicate bags
unique = x => [...new Set(x)]

// multidimensional arrays -> 1d array (a list where no element is another list)
flat = x => x.flat(Infinity)

part1 = unique(
          flat(
            recurse(['shiny gold bag']
        ))) // i should probably learn lisp... 

console.log(`Part 1: ${ part1.length } bags can hold at least one 'shiny gold bag'.`)

// PART 2

// i used a different approach on the second puzzle... just to torture myself.
// this monstruosity transforms the input text into a JSON object (a dictionary), 
// using bag names keys. I'm that good with Regex, as you can see bellow. 
bagspace = JSON.parse(
  ( '{' + document.body.innerText
    .replaceAll('bags', 'bag')
    .replaceAll('contain', ': [')
    .replaceAll('no other bag', '[')
    .replaceAll(/([a-z]) ([a-z])/g, '$1_$2')
    .replaceAll(/(\d)/g, '$1,')
    .replaceAll(/(\d,)/g, '[$1')
    .replaceAll(/([a-z]),/g, '$1],')
    .replaceAll(/(\w+_\w+_\w+)/g, '"$1"')
    .replaceAll(/\./g, '] ] ,') + '}'
  ) // this is a monstruosity
	.replace(/,\n}/, '}')  // remove illegal trailing comma 
)

// this took a while to get right. it drills down to the bags with no children
// and comes back up multiplying + summing it all up.
count = ([number, bag]) => bag       
  ? number + (number * bagspace[bag] 
    .map(count)
    .reduce( 
      (a,b) => a+b, 0
    ))
  : 0

part2 = bagspace["shiny_gold_bag"]
  .map(count) // total for all contained bags
  .reduce( (a,b) => a+b ) // sum it up 


console.log(`Part 2: a 'shiny gold bag' requires/contains ${ part2 } other bags.`)

