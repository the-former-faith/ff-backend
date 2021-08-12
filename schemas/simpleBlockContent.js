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

export default {
  title: 'Block Content',
  name: 'simpleBlockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'}
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
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
        ]
      }
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    //{
      //type: 'image',
      //options: {hotspot: true}
    //}
  ]
}
