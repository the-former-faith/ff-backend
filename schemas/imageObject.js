export default {
  name: 'imageObject',
  title: 'Image',
  type: 'image',
  fields: [
    { name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption',
      options: {
        isHighlighted: true
      }
    }
  ],
  options: {
    hotspot: true
  },
  preview: {
    select: {
      title: 'caption',
      media: 'asset'
    }
  }
}