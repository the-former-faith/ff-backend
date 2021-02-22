import { FaImage } from 'react-icons/fa'

export default {
  name: 'audioDoc',
  title: 'Audio Recording',
  icon: FaImage,
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
      name: 'files',
      title: 'Audio File',
      type: 'array',
      of: [{
        type: 'file',
        title: 'Audio File'
      }]
    },
    {
      name: 'transcriptions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'transcription',
            type: 'file',
            title: 'Transcription File'
          },
          {
            name: 'lang',
            type: 'string',
            title: 'Language'
          },
        ]
      }]
    },
    {
      name: 'cover',
      type: 'image',
      title: 'Cover Photo'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      validation: Rule => Rule.unique().error('You can only have one of a person'),
      of: [{type: 'reference', to: [{type: 'person'}, {type: 'organization'}]}]
    },
    {
      name: 'date',
      type: 'dateObject',
      title: 'Date Created',
    },
    {
      name: 'source',
      type: 'url',
      title: 'Source URL',
    },
    {
      name: 'license',
      type: 'string',
      title: 'License Type',
      options: {
        list: [
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
      title: 'Internal Notes',
      description: 'You might want to put details here about how the permission was attained, in case it was ever needed.'
    }
  ],
  initialValue: {
    permissionGranted: false,
  },
  preview: {
    select: {
      title: 'title.en',
      media: 'file'
    }
  }
}