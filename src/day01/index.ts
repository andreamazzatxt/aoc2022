import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\n\n/)
    .map((line) => line.split(/\n/))
    .map((elf) => elf.reduce((acc, curr) => acc + parseInt(curr), 0))

const part1 = (rawInput: string) =>
  parseInput(rawInput).sort((a, b) => b - a)[0]

const part2 = (rawInput: string) =>
  parseInput(rawInput)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, x) => total + x)

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
