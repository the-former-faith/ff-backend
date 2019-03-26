export default {
  type: 'object',
  name: 'dateObject',
  fields: [
  	{
      name: 'date',
      title: 'Date',
      type: 'dateDetails',
    },
    {
      name: 'dateQualifiers',
      title: 'Date Qualifiers',
      type: 'object',
      fields: [
        {
          name: 'dateEarliest',
          title: 'Earliest Date',
          type: 'dateDetails',
        },
        {
          name: 'dateLatest',
          title: 'Latest Date',
          type: 'dateDetails',
        }
      ]
    }
  ]
}