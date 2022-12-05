import run from "aocrunner"
import { contains, range, overlaps } from "../utils/index.js"

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) =>
    line
      .split(",")
      .map((range) => range.split("-").map(Number) as [number, number])
      .map((a) => range(...a)),
  )

const part1 = (rawInput: string) =>
  parseInput(rawInput).reduce(
    (acc, [range1, range2]) =>
      contains(range1, range2) || contains(range2, range1) ? acc + 1 : acc,
    0,
  )

const part2 = (rawInput: string) =>
  parseInput(rawInput).reduce(
    (acc, [range1, range2]) => (overlaps(range1, range2) ? acc + 1 : acc),
    0,
  )

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
})
