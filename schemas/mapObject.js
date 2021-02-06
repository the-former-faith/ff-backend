export default {
  name: 'mapObject',
  title: 'Map',
  type: 'object',
  fields: [
    { name: 'embed',
      type: 'reference',
      to: [{type: 'mapDocument'}]
    },
    { name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption'
    }
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'embed.mainImage.file'
    }
  }
}