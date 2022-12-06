export const splitIn = <T>(array: T[], parts: number) => {
  if (parts > array.length) {
    return [array]
  }
  let result: T[][] = []
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)))
  }
  return result
}

export const groupIn = <T>(array: T[], size: number) => {
  if (size > array.length) {
    return [array]
  }
  let result: T[][] = []
  while (array.length > 0) result.push(array.splice(0, size))
  return result
}

export const commonElements = <T>(arrays: T[][]) => {
  if (arrays.length === 0) {
    return []
  }
  if (arrays.length === 1) {
    return arrays[1]
  }
  return arrays[0].filter((item) =>
    arrays.every((comparison) => comparison.includes(item)),
  )
}

export const range = (startAt: number, endAt: number) => {
  const size = Math.abs(endAt - startAt) + 1
  return [...Array(size).keys()].map((i) => i + startAt)
}

export const contains = <T>(array1: T[], array2: T[]): boolean => {
  return array1.every((e) => array2.includes(e))
}

export const overlaps = <T>(array1: T[], array2: T[]): boolean => {
  return array1.some((e) => array2.includes(e))
}

export const invert = <T>(matrix: T[][]) => {
  const maxLen = matrix.reduce(
    (acc, line) => (acc.length > line.length ? [...acc] : [...line]),
    [],
  ).length
  return range(0, maxLen - 1).map((idx) => [...matrix.map((line) => line[idx])])
}

export const times = (n: number) => range(0, n - 1)

export const unique = <T>(a: T[]) => [...new Set(a)]

export const isUnique = <T>(a: T[]) => unique(a).length === a.length

export const scanFor = <T>(
  a: T[],
  patternLength: number,
  checkFunction: (a: T[]) => boolean,
) =>
  a.find((_, idx, array) => {
    const candidate = array.slice(idx, idx + patternLength)
    return checkFunction(candidate)
  })

export const scanForIndex = <T>(
  a: T[],
  patternLength: number,
  checkFunction: (a: T[]) => boolean,
) =>
  a.findIndex((_, idx, array) => {
    const candidate = array.slice(idx, idx + patternLength)
    return checkFunction(candidate)
  })
