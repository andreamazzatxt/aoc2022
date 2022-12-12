import run from "aocrunner"
import { Coord, letters, timesEach } from "../utils/index.js"
import { testInput } from "./testInput.js"

interface CheckPoint {
  coord: Coord
  steps: number
}
const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((l) => l.split(""))

const findStartEnd = (matrix: string[][]): [Coord, Coord] => {
  let start: Coord
  let end: Coord
  timesEach(matrix.length, (y) => {
    timesEach(matrix[0].length, (x) => {
      if (matrix[y][x] === "S") {
        start = { x, y }
      }
      if (matrix[y][x] === "E") {
        end = { x, y }
      }
    })
  })
  return [start, end]
}

const candidates = ({ x, y }: Coord): [Coord, Coord, Coord, Coord] => {
  return [
    { x, y: y - 1 }, //up
    { x: x + 1, y }, //right
    { x, y: y + 1 }, //down
    { x: x - 1, y }, //left
  ]
}

const getHigh = (matrix: string[][], { x, y }: Coord) => {
  try {
    const val = matrix[y][x]
    if (val === "S") {
      return letters.indexOf("a")
    }
    if (val === "E") {
      return letters.indexOf("z")
    }
    return val && letters.indexOf(val)
  } catch {
    return undefined
  }
}
const isEnd = (matrix: string[][], { x, y }: Coord): boolean =>
  matrix[y][x] === "E"

const key = (c: Coord) => JSON.stringify(c)

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput)
  const [start] = findStartEnd(matrix)
  const checkPoints: CheckPoint[] = [{ coord: start, steps: 0 }]
  const visited: Set<string> = new Set()
  let result: number
  while (checkPoints.length > 0) {
    const { coord, steps } = checkPoints.shift()
    if (visited.has(key(coord))) {
      continue
    }
    visited.add(key(coord))
    if (isEnd(matrix, coord)) {
      result = steps
      break
    }
    const currHigh = getHigh(matrix, coord)
    candidates(coord)
      .filter((candidate) =>
        !!candidate
          ? getHigh(matrix, candidate) - currHigh <= 1 &&
            !visited.has(key(candidate))
          : false,
      )
      .forEach((c) => checkPoints.push({ coord: c, steps: steps + 1 }))
  }
  return result
}

const isA = (matrix: string[][], { x, y }: Coord) =>
  ["a", "S"].includes(matrix[y][x])

const part2 = (rawInput: string) => {
  const matrix = parseInput(rawInput)
  const [, end] = findStartEnd(matrix)
  const checkPoints: CheckPoint[] = [{ coord: end, steps: 0 }]
  const visited: Set<string> = new Set()
  let result: number
  while (checkPoints.length > 0) {
    const { coord, steps } = checkPoints.shift()
    if (visited.has(key(coord))) {
      continue
    }
    visited.add(key(coord))
    if (isA(matrix, coord)) {
      result = steps
      break
    }
    const currHigh = getHigh(matrix, coord)
    candidates(coord)
      .filter((candidate) =>
        !!candidate
          ? currHigh - getHigh(matrix, candidate) <= 1 &&
            !visited.has(key(candidate))
          : false,
      )
      .forEach((s) => checkPoints.push({ coord: s, steps: steps + 1 }))
  }
  return result
}

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
