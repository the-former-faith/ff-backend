import { FaMapMarkedAlt } from 'react-icons/fa'

export default {
  name: 'mapObject',
  title: 'Map',
  type: 'object',
  icon: FaMapMarkedAlt,
  fields: [
    {
      name: 'text',
      type: 'simpleBlockContent',
      title: 'Text',
    },
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
}