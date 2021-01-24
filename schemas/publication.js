import { FaBookOpen } from 'react-icons/fa'

export default {
  name: 'publication',
  title: 'Publication',
  icon: FaBookOpen,
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