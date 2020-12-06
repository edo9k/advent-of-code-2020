// ultimate low effort js

// get input list & cast to integer
const list = document.body.innerText.split('\n').map(x => x|0)

// PART 1
// which pair sums to 2020
for (a of list)
  for (b of list)
    if (2020 == a+b)
      console.log(a, b, (a*b))

// PART 2
// which triplet sums to 2020
for (a of list)
  for (b of list)
    for (c of list)
      if (2020 == a + b + c)
        console.log(a, b, c, (a*b*c))

