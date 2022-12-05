import run from "aocrunner"
import { letters, splitIn, commonElements, groupIn } from "../utils/index.js"

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((bag) => bag.split(""))

const part1 = (rawInput: string) =>
  parseInput(rawInput).reduce((sum, bag) => {
    const pockets = splitIn(bag, 2)
    const [common] = commonElements(pockets)
    return sum + letters.indexOf(common)
  }, 0)

const part2 = (rawInput: string) =>
  groupIn(parseInput(rawInput), 3).reduce((sum, group) => {
    const [common] = commonElements(group)
    return sum + letters.indexOf(common)
  }, 0)

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
