import { FaMapMarkerAlt } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'location',
  title: 'Location',
  icon: FaMapMarkerAlt,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
    },
    {
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Country', value: 'country'},
          {title: 'State', value: 'state'},
          {title: 'County/Region', value: 'region'},
          {title: 'City', value: 'city'}
        ]
      }
    },
    {
      name: 'parent',
      type: 'reference',
      to: [
        {type: 'location'}
      ]
    },
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
      media: 'mainImage.file',
      subtitle: 'type'
    }
  }
}