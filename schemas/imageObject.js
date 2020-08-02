export default {
  name: 'imageObject',
  type: 'object',
  title: 'Image',
  fields: [
    {
      name: 'imageFile',
      title: 'Image File',
      type: 'reference',
      to: [
        { type: 'imageDoc' }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption'
    }
  ],
  preview: {
    select: {
      title: 'imageFile.title',
      media: 'imageFile.image'
    }
  }
}