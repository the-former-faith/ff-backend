import Quote from 'react-icons/lib/fa/quote-left'

export default {
  name: 'blockQuoteObject',
  title: 'Block Quote',
  type: 'object',
  icon: Quote,
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
  ],
  preview: {
    select: {
      title: 'text',
      givenNames: 'source.author.givenNames.en',
      familyName: 'source.author.familyName.en'
    },
    prepare(selection) {
      const {givenNames, familyName, title } = selection
      console.log(title)
      const quoteText = title.map(x => {
        return x.children.map(y => {
          return y.text
        })
      })
      return {
        title: quoteText.join(' '),
        subtitle: givenNames.join(' ') + ' ' + (familyName ? familyName : '')
      }
    }
  }
}