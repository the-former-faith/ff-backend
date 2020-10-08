import FaFileAlt from 'react-icons/fa/'

export default {
  name: 'post',
  title: 'Post',
  icon: FaFileAlt,
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
      to: {type: 'person'},
      fieldset: 'metadata'
    },
    {
      name: 'editors',
      title: 'Editors',
      type: 'array',
      validation: Rule => Rule.unique().error('You can only have one of a person'),
      of: [{type: 'reference', to: {type: 'person'}}],
      fieldset: 'metadata'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'imageObject'
    },
    {
      name: 'sections',
      title: 'Post Content Sections',
      description: 'Click on a section title to edit the content',
      type: 'array',
      of: [{type: 'section'}],
      options: {editModal:'fullscreen'}
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      validation: Rule => Rule.unique().error('You already have that category listed.'),
      of: [{type: 'reference', to: {type: 'category'}}],
      fieldset: 'metadata'
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'localeSimpleBlockContent',
      fieldset: 'metadata'
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localeBlurb',
      description: 'This will be shown in list views and shared on social media. 140 characters max length.',
      fieldset: 'metadata'
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
    }
  ],
  fieldsets: [
    {
      name: 'metadata', 
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  initialValue: {
    theme: 'defaultTheme'
  },
  preview: {
    select: {
      title: 'title.en',
      author: 'author.name',
      media: 'mainImage.imageFile.image'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
