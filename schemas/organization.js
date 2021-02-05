import { FaUserFriends } from 'react-icons/fa'

export default {
  name: 'organization',
  icon: FaUserFriends,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
    },
  }
}