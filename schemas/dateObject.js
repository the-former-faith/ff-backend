export default {
  type: 'object',
  name: 'dateObject',
  fields: [
    {
      name: 'time',
      title: 'Time',
      type: 'datetime',
    },
    {
      name: 'precision',
      title: 'Precision',
      type: 'number',
      options: {
        list: [
          {title: 'Millennium', value: 6},
          {title: 'Century', value: 7},
          {title: 'Decade', value: 8},
          {title: 'Year', value: 9},
          {title: 'Month', value: 10},
          {title: 'Day', value: 11},
          {title: 'Hour', value: 12},
          {title: 'Minute', value: 13}
        ]
      },
      validation: Rule => Rule.min(6).max(13)
    },
    {
      name: 'isCirca',
      title: 'Is Circa',
      type: 'boolean',
    },
    {
      name: 'calendar',
      title: 'Calendar',
      type: 'string',
    }
  ],
}