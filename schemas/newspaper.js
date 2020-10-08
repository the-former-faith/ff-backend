import FaNewspaper from 'react-icons/fa'

export default {
  name: 'newspaper',
  title: 'Newspaper',
  icon: FaNewspaper,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  }
}