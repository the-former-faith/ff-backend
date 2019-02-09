import Paperclip from 'react-icons/lib/fa/paperclip'
import User from 'react-icons/lib/fa/user'

export default {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Quote', value: 'blockquote' },
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
              }
            ]
          }
        }
      ]
    }
  ]
}
