import { FaUserAlt } from 'react-icons/fa'
import docMetadata from './docMetadata'
import WikidataLookup from '../components/WikidataLookup'

export default {
  name: 'person',
  title: 'Person',
  icon: FaUserAlt,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'wikidataId',
      title: 'Wikidata ID',
      type: 'string',
      inputComponent: WikidataLookup
    },
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
      name: 'date',
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
      name: 'dateEnd',
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
      media: 'mainImage.file'
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