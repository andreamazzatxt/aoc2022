import run from "aocrunner"
import { timesEach } from "../utils/array.js"
import { testInput } from "./testInput.js"

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\n\n/)
    .map((l) => l.split(/\n/).map((a) => JSON.parse(a)) as [any[], any[]])

const isNumber = (v: any) => typeof v === "number"

const compare = (left: any[], right: any[]) => {
  let result = 0
  timesEach(Math.max(left.length, right.length), (i) => {
    if (result !== 0) {
      return
    }
    if (left.length <= i) {
      result = -1
      return
    }
    if (right.length <= i) {
      result = 1
      return
    }
    const [l, r] = [left[i], right[i]]
    if ([l, r].every(isNumber)) {
      if (l !== r) {
        result = l < r ? -1 : 1
        return
      }
    } else {
      result = compare(Array.isArray(l) ? l : [l], Array.isArray(r) ? r : [r])
      return
    }
  })
  return result
}

const part1 = (rawInput: string) =>
  parseInput(rawInput).reduce(
    (acc, couple, j) => (compare(...couple) < 0 ? acc + 1 + j : acc),
    0,
  )

const part2 = (rawInput: string) => {
  const keys = [[[2]], [[6]]]
  const input = parseInput(rawInput).flat().concat(keys).sort(compare)
  return (input.indexOf(keys[0]) + 1) * (input.indexOf(keys[1]) + 1)
}

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
