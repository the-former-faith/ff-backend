import { 
  FaPaperclip, 
  FaUserAlt, 
  FaLanguage, 
  FaFileAlt, 
  FaEllipsisH, 
  FaQuoteLeft, 
  FaMapMarkerAlt, 
  FaRegCalendarAlt } from 'react-icons/fa'

export default [
  {
    name: 'link',
    type: 'object',
    title: 'link',
    fields: [
      {
        name: 'url',
        type: 'url'
      }
    ]
  },
  {
    name: 'internalLink',
    type: 'object',
    title: 'Internal link',
    blockEditor: {
      icon: FaPaperclip
    },
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [
          { type: 'post' }
          // other types you may want to link to
        ]
      }
    ]
  },
  {
    name: 'personLink',
    type: 'object',
    title: 'Person link',
    blockEditor: {
      icon: FaUserAlt
    },
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [
          { type: 'person' }
        ]
      }
    ]
  },
  {
    name: 'eventLink',
    type: 'object',
    title: 'Event link',
    blockEditor: {
      icon: FaRegCalendarAlt
    },
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [
          { type: 'event' }
        ]
      }
    ]
  },
  {
    name: 'locationLink',
    type: 'object',
    title: 'Location link',
    blockEditor: {
      icon: FaMapMarkerAlt
    },
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [
          { type: 'location' }
        ]
      }
    ]
  },
  {
    name: 'langTag',
    type: 'object',
    title: 'Language Tag',
    description: 'Use this for text that is in a different language',
    blockEditor: {
      icon: FaLanguage
    },
    fields: [
      {
        name: 'lang',
        type: 'string',
        validation: Rule => Rule.required().min(2).max(2)
      }
    ]
  },
  {
    name: 'abbrTag',
    type: 'object',
    title: 'Abbreviation',
    blockEditor: {
      icon: FaEllipsisH
    },
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      }
    ]
  },
  {
    name: 'quoteTag',
    type: 'object',
    title: 'Inline Quote',
    blockEditor: {
      icon: FaQuoteLeft
    },
    fields: [
      {
        name: 'source',
        title: 'Source URL',
        type: 'url',
      }
    ]
  },
  {
    name: 'footnote',
    type: 'object',
    title: 'Footnote',
    blockEditor: {
      icon: FaFileAlt
    },
    fields: [
      {
        title: 'Citations',
        name: 'citations',
        type: 'array',
        of: [
          {type: 'citationBook'},
          {type: 'citationNewspaperArticle'},
          {type: 'citationPublication'}
        ]
      },
      {
        name: 'content',
        title: 'Footnote Content',
        type: 'simpleBlockContent'
      }
    ]
  }
]