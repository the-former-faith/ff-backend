export default {
  name: 'audioObject',
  type: 'object',
  title: 'Audio',
  fields: [
    {
      name: 'embed',
      title: 'Audio File',
      type: 'reference',
      to: [
        { type: 'audioDoc' }
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
      title: 'embed.title.en'
    }
  }
}