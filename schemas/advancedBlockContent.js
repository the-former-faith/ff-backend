import Paperclip from 'react-icons/lib/fa/paperclip'
import User from 'react-icons/lib/fa/user'
import Language from 'react-icons/lib/fa/language'
import File from 'react-icons/lib/fa/sticky-note'
import Ellipsis from 'react-icons/lib/fa/ellipsis-h'
import Quote from 'react-icons/lib/fa/quote-left'
import MapMarker from 'react-icons/lib/fa/map-marker'
import Calendar from 'react-icons/lib/fa/calendar'

export default {
  name: 'advancedBlockContent',
  title: 'Content',
  type: 'array',      
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }
          ],
          marks: {
            annotations: [
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
                  icon: Paperclip
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
                  icon: User
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
                  icon: Calendar
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
                  icon: MapMarker
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
                  icon: Language
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
                  icon: Ellipsis
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
                  icon: Quote
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
                description: 'Use this for text that is in a different language',
                blockEditor: {
                  icon: File
                },
                fields: [
                  {
                    name: 'lang',
                    type: 'simpleBlockContent'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'imageObject'
        },
        {
          type: 'blockQuoteObject'
        }
      ]
  
}