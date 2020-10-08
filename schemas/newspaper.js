import Newspaper from 'react-icons/lib/fa/newspaper-o'

export default {
  name: 'newspaper',
  title: 'Newspaper',
  icon: Newspaper,
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