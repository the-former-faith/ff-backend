// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import simpleBlockContent from './simpleBlockContent'
import book from './book'
import category from './category'
import chartBlock from './chartBlock'
import citationBook from './citationBook'
import citationNewspaperArticle from './citationNewspaperArticle'
import post from './post'
import person from './person'
import section from './section'
import localeString from './localeString'
import localeSlug from './localeSlug'
import dateObject from './dateObject'
import dateDetails from './dateDetails'
import imageObject from './imageObject'
import localeSimpleBlockContent from './localeSimpleBlockContent'
import localeAdvancedBlockContent from './localeAdvancedBlockContent'
import localeStringArray from './localeStringArray'
import localeBlurb from './localeBlurb'
import localeImage from './localeImage'
import newspaper from './newspaper'
import newspaperArticle from './newspaperArticle'
import advancedBlockContent from './advancedBlockContent'
import blockQuoteObject from './blockQuoteObject'
import imageDoc from './imageDoc'
import location from './location'
import event from './event'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    book,
    category,
    imageDoc,
    person,
    event,
    location,
    newspaper,
    newspaperArticle,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    section,
    imageObject,
    simpleBlockContent,
    localeString,
    localeSlug,
    chartBlock,
    citationBook,
    citationNewspaperArticle,
    dateObject,
    dateDetails,
    localeSimpleBlockContent,
    localeAdvancedBlockContent,
    localeStringArray,
    localeBlurb,
    localeImage,
    advancedBlockContent,
    blockQuoteObject
  ])
})
