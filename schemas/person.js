import { FaUserAlt } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'person',
  title: 'Person',
  icon: FaUserAlt,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'givenNames',
      title: 'Given Names',
      type: 'localeStringArray',
    },
    {
      name: 'familyName',
      title: 'Family Name',
      type: 'localeString'
    },
    {
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'dateObject',
    },
    {
      name: 'placeOfBirth',
      title: 'Place of Birth',
      type: 'reference',
      to: [
        { type: 'location' }
      ]
    },
    {
      name: 'dateOfDeath',
      title: 'Date of Death',
      type: 'dateObject',
    },
    {
      name: 'placeOfDeath',
      title: 'Place of Death',
      type: 'reference',
      to: [
        { type: 'location' }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeAdvancedBlockContent'
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
      media: 'mainImage.en.imageFile.image'
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title,
        media: media
      }
    }
  }
}