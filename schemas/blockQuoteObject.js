import { FaQuoteLeft } from 'react-icons/fa'

export default {
  name: 'blockQuoteObject',
  title: 'Block Quote',
  type: 'object',
  icon: FaQuoteLeft,
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
      const { title } = selection
      
      const quoteText = (t = []) => 
        t.map((x) => 
              x.children
                ? x.children.map((y) => y.text) 
                : x);

      const joinWithSpace = (t = []) => t.join(" ")
            
      const joinedText = joinWithSpace(quoteText(title))

      const parseGivenName = (x = { givenNames: [] }) =>
        x.givenNames ? x.givenNames.join(" ") : "";

      const parseFamilyName = (x) => x.familyName || "";

      const combineNames = (x) => {
        const givenName = parseGivenName(x);
        const familyName = parseFamilyName(x);
        return givenName && familyName ? `${givenName} ${familyName}` : familyName || givenName
      };

      const displayName = x => combineNames(x) || "Unattributed"

      return {
        title: joinedText,
        subtitle: displayName(selection)
      }
    }
  }
}