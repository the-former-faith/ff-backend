export default {
  name: 'blockQuoteObject',
  title: 'Block Quote',
  type: 'object',
  fields: [
    {
      name: 'text',
      type: 'simpleBlockContent',
      title: 'Text',
    },
    {
      name: 'source',
      type: 'object',
      fields: [
        {
          name: 'author',
          title: 'Author',
          type: 'reference',
          to: [{type: 'person'}]
        },
        {
          name: 'title',
          type: 'string',
          title: 'Quote Source Title'
        },
        {
          name: 'url',
          type: 'url',
          title: 'Quote Source URL'
        }
      ]
      
    },
  ]
}