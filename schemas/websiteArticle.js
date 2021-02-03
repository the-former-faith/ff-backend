import { FaGlobe } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'websiteArticle',
  title: 'Website Article',
  icon: FaGlobe,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'parent',
      title: 'Website',
      type: 'reference',
      to: {type: 'website'},
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date Published',
      type: 'dateObject',
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'Source URL',
      type: 'url',
    },
    {
      name: 'urlArchive',
      title: 'Archive URL',
      type: 'url',
    }
  ],
  fieldsets: [
    {
      name: 'metadata', 
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage'
    },
  }
}