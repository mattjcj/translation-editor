import iterate from './iterate'
import pathString from './pathString'

export default (structure) => {
  const paths = []

  const buildResult = (path, type) => {
    return {
      type: type,
      str: pathString(path),
      arr: path,
      name: path[path.length - 1] || 'Root'
    }
  }

  const onString = (path, value) => {
    paths.push(buildResult(path, 'message'))
  }

  const onObject = (path, value, deeper) => {
    paths.push(buildResult(path, 'collection'))
    if (deeper) {
      deeper()
    }
  }

  iterate(structure, onString, onObject)

  return paths
}