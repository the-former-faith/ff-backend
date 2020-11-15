import Select from '../components/Select'
import { FaImage } from 'react-icons/fa'

export default {
  name: 'imageDoc',
  title: 'Image',
  icon: FaImage,
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
          type: 'string'
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
              {title: 'Unknown', value: 'NA'},
              {title: 'Copyright', value: 'C'},
              {title: 'Public Domain', value: 'PD'},
              {title: 'Creative Commons Attribution (CC BY)', value: 'CC_BY'},
              {title: 'Creative Commons Attribution ShareAlike (CC BY-SA)', value: 'CC_BY-SA'},
              {title: 'Creative Commons Attribution-NoDerivs (CC BY-ND)', value: 'CC_BY-ND'},
              {title: 'Creative Commons Attribution-NonCommercial (CC BY-NC)', value: 'CC_BY-NC'},
              {title: 'Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)', value: 'CC_BY-NC-SA'},
              {title: 'Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)', value: 'CC_BY-NC-ND'},
            ]
          }
        },
        {
          name: 'permissionGranted',
          type: 'boolean',
          title: 'Used with permission',
        },
        {
          name: 'notes',
          type: 'simpleBlockContent',
          title: 'Public Notes',
          description: 'If there are special requirements for attribution from the owner, they can be put here.'
        },
        {
          name: 'notesInternal',
          type: 'simpleBlockContent',
          title: 'Internal Notes',
          description: 'You might want to put details here about how the permission was attained, in case it was ever needed.'
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