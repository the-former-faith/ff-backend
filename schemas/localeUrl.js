import {SUPPORTED_LANGUAGES} from './languages'

export default {
  type: 'object',
  name: 'localeUrl',
  fields: SUPPORTED_LANGUAGES.map(lang => ({
    name: lang.id,
    type: 'url',
    title: lang.title,
  }))
}