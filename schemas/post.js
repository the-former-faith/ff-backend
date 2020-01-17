import File from 'react-icons/lib/fa/file'

export default {
  name: 'post',
  title: 'Post',
  icon: File,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'person'}
    },
    {
      name: 'editors',
      title: 'Editors',
      type: 'array',
      of: [{type: 'reference', to: {type: 'person'}}]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'localeImage'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'localeSimpleBlockContent'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localeBlurb',
      description: 'This will be shown in list views and shared on social media. 140 characters max length.'
    },
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'defaultTheme'},
          {title: 'Victorian', value: 'victorian'}
        ]
      }
    },
    {
      name: 'sections',
      title: 'Post Sections',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'section'}]
      }]
    }
  ],
  initialValue: {
    theme: 'defaultTheme'
  },
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage.en'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
