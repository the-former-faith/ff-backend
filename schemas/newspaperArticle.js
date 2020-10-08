import Newspaper from 'react-icons/lib/fa/newspaper-o'

export default {
  name: 'newspaperArticle',
  title: 'Newspaper Article',
  icon: Newspaper,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'mainImage',
      title: 'Image of Article',
      type: 'image',
    },
    {
      name: 'sections',
      title: 'Post Content Sections',
      description: 'Click on a section title to edit the content',
      type: 'array',
      of: [{type: 'section'}]
    },
    {
      name: 'newspaper',
      title: 'Newspaper',
      type: 'reference',
      to: {type: 'newspaper'},
      validation: Rule => Rule.required()
    },
    {
      name: 'pageStart',
      title: 'Start Page',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'pageEnd',
      title: 'End Page',
      type: 'number'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'}
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
      fieldset: 'source'
    },
    {
      title: 'Is the source behind a paywall?',
      name: 'paywall',
      type: 'boolean',
      fieldset: 'source'
    }
  ],
  fieldsets: [
    {
      name: 'source', 
      title: 'Source',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  initialValue: {
    paywall: false
  },
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage.en.imageFile.image'
    },
  }
}