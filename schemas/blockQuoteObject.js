export default {
  name: 'blockQuoteObject',
  title: 'Block Quote',
  type: 'object',
  fields: [
    {
      name: 'quoteText',
      type: 'simpleBlockContent',
      title: 'Quote Text',
    },
    {
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'reference',
      to: [{type: 'person'}]
    },
    {
      name: 'quoteSource',
      type: 'url',
      title: 'Quote Source URL'
    },
  ]
}