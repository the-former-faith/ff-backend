import Select from '../components/Select'

export default {
  name: 'imageObject',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Alt Text',
      validation: Rule => Rule.required(),
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'attribution',
      type: 'object',
      title: 'Attribution',
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
          type: 'localeString',
          title: 'Notes',
          description: 'If there are special requirements for attribution from the owner, they can be put here.'
        },
      ]
    }
  ]
}