import FaBook from 'react-icons/fa'

export default {
  name: 'book',
  title: 'Book',
  icon: FaBook,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
    },
    {
      name: 'mainImage',
      title: 'Cover Image',
      type: 'localeImage',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'}
    },
    {
      name: 'date',
      title: 'Date Published',
      type: 'dateObject',
    },
    {
      name: 'place',
      title: 'Place Published',
      type: 'reference',
      to: [
        { type: 'location' }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'localeAdvancedBlockContent'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage.en.imageFile.image'
    },
  }
}