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
    }
  }
}