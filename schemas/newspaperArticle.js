import { FaRegFileAlt } from 'react-icons/fa'

export default {
  name: 'newspaperArticle',
  title: 'Newspaper Article',
  icon: FaRegFileAlt,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'subtitle',
      title: 'Sub Title',
      type: 'localeString'
    },
    {
      name: 'file',
      type: 'image',
      title: 'Image File',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'localeString',
          title: 'Alt Text',
          description: 'Use Newspaper Article, if you do not need to describe an image in the clipping',
          validation: Rule => Rule.required(),
          options: {
            isHighlighted: true
          }
        },
      ]
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      validation: Rule => Rule.unique().error('You can only have one of a person'),
      of: [{type: 'reference', to: [{type: 'person'}, {type: 'organization'}]}]
    },
    {
      name: 'parent',
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
      name: 'date',
      title: 'Date Published',
      type: 'dateObject',
      validation: Rule => Rule.required()
    },
    {
      name: 'source',
      title: 'Source URL',
      type: 'url',
      fieldset: 'source'
    },
    {
      title: 'Is the source behind a paywall?',
      name: 'paywall',
      type: 'boolean',
      fieldset: 'source'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'localeAdvancedBlockContent'
    },
  ],
  fieldsets: [
    {
      name: 'source', 
      title: 'Source',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'metadata', 
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  initialValue: {
    paywall: false,
  },
  preview: {
    select: {
      title: 'title.en',
      media: 'file',
      subtitle: 'parent.title.en'
    },
  }
}