import {SUPPORTED_LANGUAGES} from './languages'

export default {
  type: 'object',
  name: 'localeBlurb',
  fields: SUPPORTED_LANGUAGES.map(lang => ({
    name: lang.id,
    type: 'string',
    title: lang.title,
    validation: Rule => Rule.min(0).max(140)
  }))
}