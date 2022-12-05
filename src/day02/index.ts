import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((turn) => turn.split(" "))

// ROCK PAPER SICORSS
// A    B     C
// X    Y     Z
// 1    2     3

const points = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
}

const getMatchPoints = (me, other) => {
  switch (me) {
    case "X":
      if (other === "A") {
        return 3
      }
      if (other === "B") {
        return 0
      }
      if (other === "C") {
        return 6
      }
    case "Y":
      if (other === "A") {
        return 6
      }
      if (other === "B") {
        return 3
      }
      if (other === "C") {
        return 0
      }
    case "Z":
      if (other === "A") {
        return 0
      }
      if (other === "B") {
        return 6
      }
      if (other === "C") {
        return 3
      }
    default:
      return 0
  }
}

const getMeMove = (other, outcome) => {
  switch (outcome) {
    case "X": // loose
      if (other === "A") {
        return "Z"
      }
      if (other === "B") {
        return "X"
      }
      if (other === "C") {
        return "Y"
      }
    case "Y": // draw
      if (other === "A") {
        return "X"
      }
      if (other === "B") {
        return "Y"
      }
      if (other === "C") {
        return "Z"
      }
    case "Z": // win
      if (other === "A") {
        return "Y"
      }
      if (other === "B") {
        return "Z"
      }
      if (other === "C") {
        return "X"
      }
    default:
      return 0
  }
}

const part1 = (rawInput: string) =>
  parseInput(rawInput).reduce(
    (acc, [other, me]) => acc + points[me] + getMatchPoints(me, other),
    0,
  )

const part2 = (rawInput: string) =>
  parseInput(rawInput).reduce((acc, [other, outcome]) => {
    const me = getMeMove(other, outcome)
    return acc + points[me] + getMatchPoints(me, other)
  }, 0)

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
