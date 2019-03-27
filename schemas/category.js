import Tag from 'react-icons/lib/fa/tag'

export default {
  name: 'category',
  title: 'Category',
  icon: Tag,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
