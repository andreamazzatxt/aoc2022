import run from "aocrunner"
import { Coord, range, timesEach } from "../utils/index.js"
import { testInput } from "./testInput.js"

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((chain) => {
      const rocks = chain.split(" -> ")
      const newRocks: string[] = []
      timesEach(rocks.length - 1, (i) => {
        const [x, y] = rocks[i].split(",").map(Number)
        const [X, Y] = rocks[i + 1].split(",").map(Number)
        if (X === x) {
          const max = Math.max(Y, y)
          const min = Math.min(Y, y)
          range(min, max).forEach((k) => {
            newRocks.push(`${x},${k}`)
          })
          return
        }
        if (Y === y) {
          const max = Math.max(X, x)
          const min = Math.min(X, x)
          range(min, max).forEach((k) => {
            newRocks.push(`${k},${y}`)
          })
        }
      })
      return newRocks
    })
    .flat()

const toS = (r: Coord) => `${r.x},${r.y}`

const fallDown = (
  rocks: Set<string>,
  rest: Set<string>,
  abiss: Abiss,
  sand: Coord,
) => {
  let arrive: Coord
  while (!arrive) {
    sand.y++
    const isAbiss =
      sand.x < abiss.xMin || sand.y > abiss.yMax || sand.x > abiss.xMax
    if (rocks.has(toS(sand)) || rest.has(toS(sand)) || isAbiss) {
      arrive = { ...sand, y: sand.y - 1 }
    }
  }
  return arrive
}

enum Outcome {
  REST = "r",
  INFINITE = "i",
}

const fall = (
  rocks: Set<string>,
  rest: Set<string>,
  sand: Coord,
  abiss: Abiss,
) => {
  let outCome: Outcome
  while (!outCome) {
    if (sand.x < abiss.xMin || sand.y > abiss.yMax || sand.x > abiss.xMax) {
      outCome = Outcome.INFINITE
      break
    }
    const f = fallDown(rocks, rest, abiss, sand)
    sand.x = f.x
    sand.y = f.y
    const left = toS({ x: sand.x - 1, y: sand.y + 1 })
    if (!rocks.has(left) && !rest.has(left)) {
      sand.x--
      sand.y++
      continue
    }
    const right = toS({ x: sand.x + 1, y: sand.y + 1 })

    if (!rocks.has(right) && !rest.has(right)) {
      sand.x++
      sand.y++
      continue
    }
    outCome = Outcome.REST
    break
  }
  return outCome
}

interface Abiss {
  xMax: number
  xMin: number
  yMax: number
}

const calcAbiss = (rocks: Set<string>): Abiss => {
  const Xs = []
  const Ys = []
  rocks.forEach((rock) => {
    const [x, y] = rock.split(",").map(Number)
    Xs.push(x)
    Ys.push(y)
  })
  return {
    xMax: Math.max(...Xs),
    xMin: Math.min(...Xs),
    yMax: Math.max(...Ys),
  }
}

const part1 = (rawInput: string) => {
  const rocks = new Set(parseInput(rawInput))
  const rest: Set<string> = new Set()
  const abiss = calcAbiss(rocks)

  while (true) {
    const sand = { x: 500, y: 0 } as Coord
    const outcome = fall(rocks, rest, sand, abiss)
    if (outcome === Outcome.INFINITE) {
      break
    }
    rest.add(toS(sand))
  }
  return rest.size
}
const fallDown2 = (
  rocks: Set<string>,
  rest: Set<string>,
  ground: number,
  sand: Coord,
) => {
  let arrive: Coord
  while (!arrive) {
    sand.y++
    if (rocks.has(toS(sand)) || rest.has(toS(sand)) || sand.y === ground) {
      arrive = { ...sand, y: sand.y - 1 }
    }
  }
  return arrive
}

const fall2 = (
  rocks: Set<string>,
  rest: Set<string>,
  sand: Coord,
  ground: number,
) => {
  let outCome: Outcome
  while (!outCome) {
    const f = fallDown2(rocks, rest, ground, sand)
    sand.x = f.x
    sand.y = f.y
    const left = toS({ x: sand.x - 1, y: sand.y + 1 })
    if (!rocks.has(left) && !rest.has(left) && ground !== sand.y + 1) {
      sand.x--
      sand.y++
      continue
    }
    const right = toS({ x: sand.x + 1, y: sand.y + 1 })

    if (!rocks.has(right) && !rest.has(right) && ground !== sand.y + 1) {
      sand.x++
      sand.y++
      continue
    }
    outCome = Outcome.REST
    break
  }
  return outCome
}

const part2 = (rawInput: string) => {
  const rocks = new Set(parseInput(rawInput))
  const abiss = calcAbiss(rocks)
  const ground = abiss.yMax + 2
  const rest: Set<string> = new Set()

  while (!rest.has("500,0")) {
    const sand = { x: 500, y: 0 } as Coord
    fall2(rocks, rest, sand, ground)
    rest.add(toS(sand))
  }
  return rest.size
}

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
