export const toTitleCase = (string: string): string => {
  let str: string
  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  const lowers = [
    'A',
    'An',
    'The',
    'And',
    'But',
    'Or',
    'For',
    'Nor',
    'As',
    'At',
    'By',
    'For',
    'From',
    'In',
    'Into',
    'Near',
    'Of',
    'On',
    'Onto',
    'To',
    'With',
  ]
  // Certain words such as initialisms or acronyms should be left uppercase
  const uppers = ['Id', 'Tv']
  str = string.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
  for (let i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp(`\\s${lowers[i]}\\s`, 'g'), function (txt) {
      return txt.toLowerCase()
    })
  for (let i = 0, j = uppers.length; i < j; i++)
    str = str.replace(
      new RegExp(`\\b${uppers[i]}\\b`, 'g'),
      uppers[i].toUpperCase()
    )
  return str
}

export default toTitleCase
