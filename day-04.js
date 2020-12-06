// PART 1
passports = document.body.innerText.split('\n\n') // get input

fields = [
  'byr', /* birth year */
  'iyr', /* issue year */
  'eyr', /* expiration year */
  'hgt', /* height */
  'hcl', /* hair color */
  'ecl', /* eye color */
  'pid', /* passport id */

  // ignored -> 'cid', /* country id */
]

// return true if passport has all required fields
has_all_field = passport => fields
  .every(field => passport
    .indexOf(field + ':') !== -1)

count = passwords
  .map(has_all_fields) // hmmm, point-free, yeeeees!
  .map(x => x|0)       // cast to int
  .reduce( (a,b) => a + b, 0 ) // sum shit up

console.log(count)

// PART 2
validator = {
  birth_year(s) {
    year = s.match(/byr:(\d{4})/)[1]|0
    return !(year < 1920 || year > 2002)
  },
  issue_year(s) {
    year = s.match(/iyr:(\d{4})/)[1]|0
    return !(year < 2010 || year > 2020)
  },
  expiration_year(s) {
    year = s.match(/eyr:(\d{4})/)[1]|0
    return !(year < 2020 || year > 2030)
  },

  hair_color(s)  { return !!s.match(/hcl:#[0-9a-f]{6}\b/) },
  eye_color(s)   { return !!s.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)\b/) },
  passport_id(s) { return !!s.match(/pid:\d{9}\b/) },

  height(s) {
    try {
      // this took way longer than i had planned and i'm too lazy
      // to write a version that does not throw an error
      // so fuck it, here's the try-catch-fuck-this block.
      height = s.match(/hgt:(.*)/)[1]; // i was forced to use a semicolmn here

      [ ignored, number, system ] = height.match(/(\d+)(cm|in)/)

      if ('cm' === system) {
        if (number < 150 || number > 193) return false
      } else { // inches 
        if (number < 59  || number > 76) return false
      }
    } catch (e) { return false }

    return true
}

use_validator = passport => Object.keys(validator).every( x => validator[x](passport) )

count = passports
  .filter(has_all_fields)
  .filter(use_validator)
  .length

console.log(count)

