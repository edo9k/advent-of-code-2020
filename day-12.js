// PART 1

//input = $0.innerText.split('\n').slice(0, -1)
//input = 'F10\nN3\nF7\nR90\nF11'.split('\n')
input = document.body.innerText.split('\n').filter(x => x)

// puts direction in an array, in the correct order
directions = 'ESWN'.split('')

// our current position and direction
position = { E: 0, S: 0, W: 0, N: 0, pointing: 'E' }

// gets degrees to turn, returns updated direction
degree_to_direction = deg => {
	direction_index = (deg/90)
    
	current_index = directions.indexOf(position.pointing)

    next_index = (current_index + direction_index + 32) % 4

    // console.log({ degree: deg, direction_index, next_index, new_direction: directions[next_index] })

	return directions[next_index]	
}

// updates current position and direction
moves = {
 F(n)	{ position[position.pointing] += n },
 L(deg)	{ position.pointing = degree_to_direction(deg * -1) },
 R(deg)	{ position.pointing = degree_to_direction(deg)	    }
 // ? move_dir(dir, n) { positions[dir] += n }
}

// add all directions to 'moves' object
addDirection = d => { moves[d] = n => { position[d]+=n } }

directions.forEach(addDirection)

// convert input in instructions list
instructions = input.map(x => {
	let [ instruction, number ] = x.match(/([A-Z])|(\d+)/g)
	return { instruction , number: number|0 } 
})

//console.table(position)
//console.table(instructions)

instructions.forEach(x => {
	moves[x.instruction](x.number)
	console.log(position, x)	
})

console.table(position)
console.log(`Manhattan distance is ${ 
	Math.abs(position.N - position.S) + Math.abs(position.E - position.W)
}`)

