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
      ]
    },
    {
      name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption'
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Alt Text',
      validation: Rule => Rule.required(),
    }
  ]
}