import advancedBlockMarks from './advancedBlockMarks.js'

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
            annotations: [...advancedBlockMarks]
          }
        },
        {
          type: 'imageObject'
        },
        {
          type: 'blockQuoteObject'
        },
        {
          type: 'chartBlock'
        }
      ]
  
}