import run from "aocrunner"
import { matrixForEach } from "../utils/index.js"

const parseInput = (rawInput: string) =>
  rawInput.split(/\n/).map((line) => line.split("").map(Number))

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput)

  let withVisibility = matrix.length * matrix[0].length

  matrixForEach(matrix, (cell, row, column, x, y) => {
    const colVis =
      Math.max(...column.slice(0, y)) < cell ||
      Math.max(...column.slice(y + 1)) < cell
    const rowlVis =
      Math.max(...row.slice(0, x)) < cell ||
      Math.max(...row.slice(x + 1)) < cell

    !colVis && !rowlVis && withVisibility--
  })
  return withVisibility
}

const visibleTrees = (line: number[], tree: number) => {
  const firstHigherIdx = line.findIndex((t) => t >= tree)
  return firstHigherIdx === -1
    ? line.length
    : line.slice(0, firstHigherIdx + 1).length
}

const part2 = (rawInput: string) => {
  const matrix = parseInput(rawInput)
  let bestScenic = 0
  matrixForEach(matrix, (cell, row, column, x, y) => {
    const up = column.slice(0, y).reverse()
    const down = column.slice(y + 1)
    const left = row.slice(0, x).reverse()
    const right = row.slice(x + 1)
    const currScenic =
      visibleTrees(up, cell) *
      visibleTrees(down, cell) *
      visibleTrees(left, cell) *
      visibleTrees(right, cell)
    if (currScenic > bestScenic) {
      bestScenic = currScenic
    }
  })

  return bestScenic
}

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
