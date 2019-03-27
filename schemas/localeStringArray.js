import {SUPPORTED_LANGUAGES} from './languages'

export default {
  type: 'object',
  name: 'localeStringArray',
  fields: SUPPORTED_LANGUAGES.map(lang => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
    type: 'array',
    of: [{ type: 'string' }],
    options: {
      layout: 'tags'
    }
  }))
}