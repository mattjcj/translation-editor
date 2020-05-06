import iterate from './iterate'
import _ from 'lodash'
import pathString from './pathString'
import pathName from './pathName'
import pathId from './pathId'

export default (messages, structure) => {
  const paths = []

  const buildResult = (path, type, value) => {
    let isValid = true
    Object.keys(messages).forEach((locale) => {
      const message = _.get(messages[locale], path)
      // for it to be valid, it need to be set to valid previously, and to exist
      isValid = isValid && message && !!message.length
    })

    return {
      type: type,
      str: pathString(path),
      id: pathId(path),
      arr: path,
      name: pathName(path),
      isValid: isValid
    }
  }

  const onString = (path, value) => {
    paths.push(buildResult(path, 'message', value))
  }

  const onObject = (path, value, deeper) => {
    paths.push(buildResult(path, 'collection', null))
    if (deeper) {
      deeper()
    }
  }

  iterate(structure, onString, onObject)

  return paths
}