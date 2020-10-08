import Select from '../components/Select'
import FaRegImage from 'react-icons/fa'

export default {
  name: 'imageDoc',
  title: 'Image',
  icon: FaRegImage,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'creator',
          title: 'Creator',
          type: 'array',
          of: [
            {
              type: 'string'
            }
          ]
        },
        {
          name: 'dateCreated',
          type: 'datetime',
          title: 'Date Created',
        },
        {
          name: 'altText',
          type: 'localeString',
          title: 'Alt Text',
          validation: Rule => Rule.required()
        },
        {
          name: 'source',
          type: 'url',
          title: 'Source URL',
        },
        {
          name: 'licenceTypes',
          type: 'string',
          title: 'License Type',
          inputComponent: Select,
          options: {
            values: [
              {title: 'Public Domain', value: 'PD'},
              {title: 'Creative Commons 1', value: 'CC1'}
            ]
          }
        },
        {
          name: 'notes',
          type: 'simpleBlockContent',
          title: 'Notes',
          description: 'If there are special requirements for attribution from the owner, they can be put here.'
        },
      ]
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}