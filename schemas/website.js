import { FaBookOpen } from 'react-icons/fa'

export default {
  name: 'website',
  title: 'Website',
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