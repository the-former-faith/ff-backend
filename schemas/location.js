import { FaMapMarkerAlt } from 'react-icons/fa'

export default {
  name: 'location',
  title: 'Location',
  icon: FaMapMarkerAlt,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}