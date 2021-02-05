import { FaMapMarkedAlt } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'mapDocument',
  title: 'Map',
  type: 'document',
  icon: FaMapMarkedAlt,
  fields: [
    ...docMetadata,
    {
      title: 'Marker Points',
      name: 'points',
      type: 'array',
      of: [ {
        name: 'point',
        title: 'Point',
        type: 'object',
        fields: [
          {
            title: 'Title',
            name: 'title',
            type: 'string'
          },
          {
            title: 'Location',
            name: 'location',
            type: 'geopoint'
          }
        ],
      }]
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
      media: 'mainImage.image'
    }
  }
}