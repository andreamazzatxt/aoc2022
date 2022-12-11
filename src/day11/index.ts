import run from "aocrunner"
import { timesEach } from "../utils/array.js"
import { testInput } from "./testInput.js"

type Operator = "+" | "*"

interface Monkey {
  n: number
  items: number[]
  op: [false | number, Operator, false | number]
  test: [number, number, number]
}

const parseInput = (rawInput: string) =>
  rawInput.split(/\n\n/).map((monkey) => {
    const line = monkey.split(/\n/)
    return {
      n: Number(line[0].slice(7, 8)),
      items: line[1].slice(18).split(", ").map(Number),
      op: line[2]
        .slice(19)
        .split(" ")
        .map((s) => s !== "old" && (Number(s) || s)),
      test: line.slice(3).map((v) => Number(v.split(" ").at(-1))),
    } as Monkey
  })

const calc = ([f, op, s]: Monkey["op"], n: number) => {
  return op === "*" ? (f || n) * (s || n) : (f || n) + (s || n)
}

const result = (i: number[]) =>
  i
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((a, v) => a * v, 1)

const test = (monkey: Monkey, worryLevel: number) =>
  worryLevel % monkey.test[0] === 0 ? monkey.test[1] : monkey.test[2]

const part1 = (rawInput: string) => {
  const monkeys = parseInput(rawInput)
  const inspections: number[] = monkeys.map(() => 0)
  timesEach(20, () => {
    timesEach(monkeys.length, (m) => {
      const monkey = monkeys[m]
      timesEach(monkey.items.length, (i) => {
        let worryLevel = monkey.items.shift()
        if (worryLevel) {
          inspections[m] += 1
          worryLevel = Math.floor(calc(monkey.op, worryLevel) / 3)
          monkeys[test(monkey, worryLevel)].items.push(worryLevel)
        }
      })
    })
  })
  return result(inspections)
}

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput)
  const inspections: number[] = monkeys.map(() => 0)
  const mod = monkeys.reduce((a, m) => a * m.test[0], 1)
  timesEach(10000, () => {
    timesEach(monkeys.length, (m) => {
      const monkey = monkeys[m]
      timesEach(monkey.items.length, (i) => {
        let worryLevel = monkey.items.shift()
        if (worryLevel) {
          inspections[m] += 1
          worryLevel = calc(monkey.op, worryLevel) % mod
          monkeys[test(monkey, worryLevel)].items.push(worryLevel)
        }
      })
    })
  })
  return result(inspections)
}

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
