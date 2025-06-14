import slugify from 'slugify'

export const generateSlug = (str?: string) => {
  if (!str) return ''
  return slugify(str, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[().,#$%^&*"':/]+/, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'vi', // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  })
}
