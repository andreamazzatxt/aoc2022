import run from "aocrunner"

const FS = 70000000
const SPACE_NEEDED = 30000000

interface Directory {
  name: string
  subDirectories: Directory[]
  files: File[]
  parent?: Directory
}

interface File {
  name: string
  size: number
}

const parseInput = (rawInput: string) => rawInput.split(/\n/)

const executeCommand = (command: string, currentDir?: Directory): Directory => {
  if (command.at(0) === "$") {
    const [, ist, target] = command.split(" ")
    if (ist === "cd") {
      switch (target) {
        case "/": // CREATE ROOT
          return { name: "/", subDirectories: [], files: [] }
        case "..": // GO TO PARENT DIR
          return currentDir.parent
        default: // GO TO SUB DIR
          return currentDir.subDirectories.find((d) => d.name === target)
      }
    }
    return currentDir
  }
  const [size, name] = command.split(" ")
  if (size === "dir") {
    currentDir.subDirectories.push({
      name,
      subDirectories: [],
      files: [],
      parent: currentDir,
    })
  } else {
    currentDir.files.push({ name, size: parseInt(size) })
  }
  return currentDir
}

const filesSize = (dir: Directory) =>
  dir.files.reduce((acc, curr) => acc + curr.size, 0)

const directorySize = (dir: Directory) =>
  dir.subDirectories.reduce(
    (acc, curr) => acc + directorySize(curr),
    filesSize(dir),
  )

const buildDirectoryTree = (commands: string[]) => {
  const dirs: Set<Directory> = new Set([])
  let currentDir: Directory
  commands.forEach((command) => {
    currentDir = executeCommand(command, currentDir)
    dirs.add(currentDir)
  })
  return dirs
}

const part1 = (rawInput: string) => {
  const commands = parseInput(rawInput)
  const dirs = buildDirectoryTree(commands)
  return Array.from(dirs.entries())
    .map(([dir]) => directorySize(dir))
    .reduce((acc, curr) => (curr <= 100000 ? acc + curr : acc), 0)
}

const part2 = (rawInput: string) => {
  const commands = parseInput(rawInput)
  const dirs = buildDirectoryTree(commands)

  const sizes = Array.from(dirs.entries()).map(([dir]) => directorySize(dir))
  const freeSpace = FS - Math.max(...sizes)
  const toBeFreed = SPACE_NEEDED - freeSpace
  return sizes.sort((a, b) => a - b).find((s) => s >= toBeFreed)
}

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
