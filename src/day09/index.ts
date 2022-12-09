import run from "aocrunner"
import { range, Coord, adiacents, timesEach } from "../utils/index.js"

type Command = "U" | "D" | "L" | "R"

const parseInput = (rawInput: string) =>
  rawInput
    .split(/\n/)
    .map((line) => line.split(" "))
    .map(([c, t]) => [c, Number(t)] as [Command, number])

const moveHead = (command: Command, head: Coord) => {
  switch (command) {
    case "U":
      head.y += 1
      break
    case "D":
      head.y -= 1
      break
    case "L":
      head.x -= 1
      break
    case "R":
      head.x += 1
      break
    default:
      throw new Error("Command not found " + command)
  }
}

const moveKnot = (prevKnot: Coord, knot: Coord) => {
  if (!adiacents(prevKnot, knot)) {
    if (prevKnot.x === knot.x) {
      // VERTICAL
      if (prevKnot.y > knot.y) {
        knot.y += 1
      } else {
        knot.y -= 1
      }
    } else if (prevKnot.y === knot.y) {
      // HORIZONTAL
      if (prevKnot.x > knot.x) {
        knot.x += 1
      } else {
        knot.x -= 1
      }
    } else {
      //TR
      if (prevKnot.y > knot.y && prevKnot.x > knot.x) {
        knot.y += 1
        knot.x += 1
      }
      //TL
      if (prevKnot.y > knot.y && prevKnot.x < knot.x) {
        knot.y += 1
        knot.x -= 1
      }
      //BL
      if (prevKnot.y < knot.y && prevKnot.x < knot.x) {
        knot.y -= 1
        knot.x -= 1
      }
      //BR
      if (prevKnot.y < knot.y && prevKnot.x > knot.x) {
        knot.y -= 1
        knot.x += 1
      }
    }
  }
}

const coordToString = (n: Coord) => `${n.x}-${n.y}`

const part1 = (rawInput: string) => {
  const commands = parseInput(rawInput)
  const head = { x: 0, y: 0 }
  const tail = { x: 0, y: 0 }
  const visitedPositions = new Set(["0-0"])

  commands.forEach(([command, steps]) => {
    timesEach(steps, () => {
      moveHead(command, head)
      moveKnot(head, tail)
      visitedPositions.add(coordToString(tail))
    })
  })
  return visitedPositions.size
}

const part2 = (rawInput: string) => {
  const commands = parseInput(rawInput)
  const knots: Coord[] = range(0, 9).map(() => ({ x: 0, y: 0 }))
  const visitedPositions = new Set(["0-0"])

  commands.forEach(([command, steps]) => {
    timesEach(steps, () => {
      knots.forEach((knot, i, a) =>
        i ? moveKnot(a.at(i - 1), knot) : moveHead(command, knot),
      )
      visitedPositions.add(coordToString(knots.at(-1)))
    })
  })
  return visitedPositions.size
}

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
      `,
        expected: 1,
      },
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
      `,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
