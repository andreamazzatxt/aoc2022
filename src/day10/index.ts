import run from "aocrunner"
import { range, times } from "../utils/index.js"
import { testInput } from "./testInput.js"

type Instruction = {
  op: "addx" | "noop" | ""
  n: number
}

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((line) => line.split(" "))
    .map(([op, n]) => ({ op, n: Number(n) } as Instruction))

const toAdd = (i: Instruction) => (i.op === "addx" ? i.n : 0)

const waitCycles = (i: Instruction) => (i.op === "addx" ? 2 : 1)

const signalStrength = (cycle: number, x: number) =>
  [20, 60, 100, 140, 180, 220].includes(cycle) ? cycle * x : 0

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput)
  let x = 1
  let instruction: Instruction = { op: "", n: 0 }
  let nextOpCycle = 1
  return range(1, 220).reduce((acc, cycle) => {
    if (cycle === nextOpCycle) {
      x += toAdd(instruction)
      instruction = instructions.shift()
      nextOpCycle += waitCycles(instruction)
    }
    return acc + signalStrength(cycle, x)
  }, 0)
}

const getPixel = (x: number, pos: number) =>
  "###".padStart(2 + x, ".").padEnd(40, ".")[pos]

const isLastPixel = (c: number) => c % 40 === 0

const print = (CRT: string[][]) =>
  CRT.map((l) => l.join("")).forEach((l) => console.log(l))

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput)
  let x = 1
  let [crtLine, spriteIdx, nextOpCycle] = [[], 0, 1]
  const CRT: string[][] = [crtLine]
  let instruction: Instruction = { op: "", n: 0 }

  range(1, 240).forEach((cycle) => {
    if (cycle === nextOpCycle) {
      x += toAdd(instruction)
      instruction = instructions.shift()
      nextOpCycle += waitCycles(instruction)
    }

    const pixel = getPixel(x, spriteIdx)

    crtLine.push(pixel)

    if (isLastPixel(cycle)) {
      crtLine = []
      CRT.push(crtLine)
      spriteIdx = 0
    } else {
      spriteIdx++
    }
  })

  //RESULT PRINTED IN CONSOLE
  return print(CRT)
}

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: undefined,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
