export default {
  name: 'videoObject',
  type: 'object',
  title: 'Video',
  fields: [
    {
      name: 'imageFile',
      title: 'Image File',
      type: 'reference',
      to: [
        { type: 'videoDoc' }
      ]
    },
    {
      name: 'url',
      title: 'External URL',
      type: 'url',
    },
    {
      name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption'
    },
    {
      name: 'startTime',
      type: 'timeObject',
      title: 'Start Time',
    },
    {
      name: 'endTime',
      type: 'timeObject',
      title: 'End Time',
    },
  ],
  preview: {
    select: {
      title: 'imageFile.title',
      media: 'imageFile.image'
    }
  }
}