import {SUPPORTED_LANGUAGES} from './languages'

export default {
  name: 'localeImage',
  type: 'object',
  fields: SUPPORTED_LANGUAGES.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'imageObject'
  })),
  preview: {
    select: {
      media: 'en.id.imageFile.image'
    }
  }
}