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
      of: [ 
        {
          type: 'reference',
          to: [
            {type: 'location'},
            {type: 'event'},
          ]
        }
      ]
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