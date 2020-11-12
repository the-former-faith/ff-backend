import advancedBlockMarks from './advancedBlockMarks.js'

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
            annotations: [...advancedBlockMarks]
          }
        },
        {
          type: 'imageObject'
        },
        {
          type: 'videoObject'
        },
        {
          type: 'blockQuoteObject'
        },
        {
          type: 'chartBlock'
        }
      ]
  
}