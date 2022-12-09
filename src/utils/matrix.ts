import { range } from "./array.js"
import { Coord } from "./types.js"

export const adiacents = (a: Coord, b: Coord) => {
  return (
    range(a.x - 1, a.x + 1).includes(b.x) &&
    range(a.y - 1, a.y + 1).includes(b.y)
  )
}
