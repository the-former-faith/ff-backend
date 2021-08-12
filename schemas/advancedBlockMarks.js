import {
  FaBible,
  FaPaperclip, 
  FaUserAlt, 
  FaLanguage, 
  FaFileAlt, 
  FaEllipsisH, 
  FaQuoteLeft, 
  FaMapMarkerAlt, 
  FaRegCalendarAlt,
  FaItunesNote } from 'react-icons/fa'

import { ImPageBreak } from 'react-icons/im'

export default [
  {
    name: 'link',
    type: 'object',
    title: 'link',
    fields: [
      {
        name: 'href',
        title: 'URL',
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
          { type: 'post' },
          { type: 'organization' },
          { type: 'newspaperArticle' },
          { type: 'book' }
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
    name: 'bibleTag',
    type: 'object',
    title: 'Bible Verse',
    blockEditor: {
      icon: FaBible
    },
    fields: [
      {
        name: 'book',
        type: 'string',
        options: {
          list: [
            "Genesis",
            "Exodus",
            "Leviticus",
            "Numbers",
            "Deuteronomy",
            "Joshua",
            "Judges",
            "Ruth",
            "1 Samuel",
            "2 Samuel",
            "1 Kings",
            "2 Kings",
            "1 Chronicles",
            "2 Chronicles",
            "Ezra",
            "Nehemiah",
            "Esther",
            "Job",
            "Psalms",
            "Proverbs",
            "Ecclesiastes",
            "Song of Solomon",
            "Isaiah",
            "Jeremiah",
            "Lamentations",
            "Ezekiel",
            "Daniel",
            "Hosea",
            "Joel",
            "Amos",
            "Obadiah",
            "Jonah",
            "Micah",
            "Nahum",
            "Habakkuk",
            "Zephaniah",
            "Haggai",
            "Zechariah",
            "Malachi",
            "Matthew",
            "Mark",
            "Luke",
            "John",
            "Acts",
            "Romans",
            "1 Corinthians",
            "2 Corinthians",
            "Galatians",
            "Ephesians",
            "Philippians",
            "Colossians",
            "1 Thessalonians",
            "2 Thessalonians",
            "1 Timothy",
            "2 Timothy",
            "Titus",
            "Philemon",
            "Hebrews",
            "James",
            "1 Peter",
            "2 Peter",
            "1 John",
            "2 John",
            "3 John",
            "Jude",
            "Revelation"
          ]
        }
      },
      {
        name: 'chapter',
        type: 'number',
      },
      {
        name: 'verse',
        type: 'number',
      },
      {
        name: 'verseEnd',
        type: 'number',
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
    name: 'pageBreak',
    type: 'object',
    title: 'Page Break',
    blockEditor: {
      icon: ImPageBreak
    },
    fields: [
      {
        name: 'page',
        type: 'string',
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
    name: 'songLink',
    type: 'object',
    title: 'Song link',
    blockEditor: {
      icon: FaItunesNote
    },
    fields: [
      {
        name: 'reference',
        type: 'reference',
        to: [
          { type: 'song' }
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
          {type: 'citationPublicationArticle'},
          {type: 'citationWebsiteArticle'},
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