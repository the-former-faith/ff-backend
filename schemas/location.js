import MapMarker from 'react-icons/lib/fa/map-marker'

export default {
  name: 'location',
  title: 'Location',
  icon: MapMarker,
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