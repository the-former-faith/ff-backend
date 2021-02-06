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
import citationPublicationArticle from './citationPublicationArticle'
import citationUrl from './citationWebsiteArticle'
import post from './post'
import person from './person'
import section from './section'
import localeString from './localeString'
import localeSlug from './localeSlug'
import dateObject from './dateObject'
import imageObject from './imageObject'
import videoObject from './videoObject'
import localeSimpleBlockContent from './localeSimpleBlockContent'
import localeAdvancedBlockContent from './localeAdvancedBlockContent'
import localeStringArray from './localeStringArray'
import localeBlurb from './localeBlurb'
import localeImage from './localeImage'
import mapDocument from './mapDocument'
import mapObject from './mapObject'
import newspaper from './newspaper'
import newspaperArticle from './newspaperArticle'
import newspaperArticleObject from './newspaperArticleObject'
import organization from './organization'
import publication from './publication'
import publicationArticle from './publicationArticle'
import song from './song'
import advancedBlockContent from './advancedBlockContent'
import blockQuoteObject from './blockQuoteObject'
import imageDoc from './imageDoc'
import videoDoc from './videoDoc'
import location from './location'
import event from './event'
import time from './time'
import website from './website'
import websiteArticle from './websiteArticle'

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
    videoDoc,
    person,
    event,
    location,
    newspaper,
    newspaperArticle,
    organization,
    publication,
    publicationArticle,
    song,
    website,
    websiteArticle,
    mapDocument,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    section,
    imageObject,
    videoObject,
    simpleBlockContent,
    localeString,
    localeSlug,
    chartBlock,
    citationBook,
    citationNewspaperArticle,
    citationPublicationArticle,
    citationUrl,
    dateObject,
    localeSimpleBlockContent,
    localeAdvancedBlockContent,
    localeStringArray,
    localeBlurb,
    localeImage,
    advancedBlockContent,
    blockQuoteObject,
    mapObject,
    newspaperArticleObject,
    time
  ])
})
