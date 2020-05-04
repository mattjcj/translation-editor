import _ from 'lodash'
import iterate from './iterate'

export default (messages) => {
  const locales = Object.keys(messages)
  const structure = {}

  // when we get a message string, add it to the structure
  const onString = (path, value) => {
    _.set(structure, path, '')
  }

  // when we get a message, keep digging until we can't
  const onObject = (path, value, deeper) => {
    if(deeper) {
      deeper()
    } else {
      _.set(structure, path, {})
    }
  }

  locales.forEach((locale) => {
    iterate(messages[locale], onString, onObject)
  })

  return structure
}
