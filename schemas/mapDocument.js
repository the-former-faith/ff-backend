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
    },
    {
      name: 'center',
      title: 'Map Center',
      type: 'geopoint',
      validation: Rule => Rule.required()
    },
    {
      name: 'zoom',
      title: 'Zoom Level',
      type: 'number',
      validation: Rule => Rule.required()
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
  initialValue: {
    zoom: 12
  },
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage.image'
    }
  }
}