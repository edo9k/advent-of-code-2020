// PART 1
trees = document.body.innerText.split('\n') // get trees
trees.pop() // trash empty line
            // & make fp programmers cry

// absolute low efford here
down = right = tree_count = 0

while (true) {
  down++    // walk a row down
  right+= 3 // and three columns right

  if (!trees[down]) brek; 

  if ('#' === trees[down][right % 31]) tree_count++
}

console.log(tree_count)

// PART 2
step_rules = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 }
]

all_trees_found = []

for (step of step_rules) {
  // keep track of shit
  down = right = tree_count = 0

  while (true) {
    down  += step.down  // walk down
    right += step.right // walk right

    if (!trees[down]) break;

    if ('#' === trees[down][right % 31])
      tree_count++
  }

  all_trees_found.push(tree_count)
}

console.log(all_trees_found.reduce( (a,b) => a * b, 1))

