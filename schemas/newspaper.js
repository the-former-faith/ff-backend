import { FaNewspaper } from 'react-icons/fa'

export default {
  name: 'newspaper',
  title: 'Newspaper',
  icon: FaNewspaper,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: input => input
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'city',
      type: 'reference',
      to: [
        {type: 'location'}
      ]
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'city.title.en'
    },
  }
}